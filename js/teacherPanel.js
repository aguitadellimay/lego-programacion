/**
 * teacherPanel.js
 * Módulo de Administración Docente para "Lego Familiar".
 * Permite al docente habilitar y bloquear módulos de forma independiente,
 * proteger el acceso con clave y persistir la configuración localmente.
 */

(function (global) {
  'use strict';

  // -------------------------------------------------------------
  // 1. Constantes y Configuración de Seguridad
  // -------------------------------------------------------------
  const DEFAULT_SALT = 'lego_salt_2026:';
  // Hash SHA-256 de 'Docente2402' con sal 'lego_salt_2026:'
  // d3576667aa4926077e9dac464ea2b08f9932dd5313d9c73c0a3bf9af8eaf86dd
  const DEFAULT_HASH = 'd3576667aa4926077e9dac464ea2b08f9932dd5313d9c73c0a3bf9af8eaf86dd';

  const STORAGE_KEYS = {
    STATUS: 'lego_teacher_module_status',
    AUTH: 'lego_teacher_auth_config',
    SESSION: 'lego_teacher_session'
  };

  const SESSION_DURATION_MS = 45 * 60 * 1000; // 45 minutos

  // Definición de los 4 módulos principales
  const MODULE_DEFINITIONS = [
    {
      id: 'play',
      name: 'Jugar y aprender',
      tag: 'Matemática • 5 Desafíos',
      description: 'Desafíos matemáticos, slimes en movimiento y acertijos de lógica.',
      icon: '🎮',
      screens: ['screen-grades', 'screen-game'],
      bannerId: 'banner-play',
      buttonId: 'btn-home-play'
    },
    {
      id: 'coding',
      name: 'Módulo de programación',
      tag: 'Pensamiento Computacional • 1° a 5°',
      description: 'Aprende instrucciones, algoritmos cotidianos y desafíos interactivos con Byte.',
      icon: '💻',
      screens: ['screen-coding-grades', 'screen-coding-syllabus', 'screen-coding-topic'],
      bannerId: 'banner-coding',
      buttonId: 'btn-home-coding'
    },
    {
      id: 'adventure',
      name: 'La aventura de Bity',
      tag: 'Desafío Final: Instrucciones',
      description: 'Videojuego de plataformas 2D con saltos, bloques, preguntas y el cohete espacial.',
      icon: '🤖',
      screens: ['screen-coding-adventure'],
      bannerId: 'banner-adventure',
      buttonId: 'btn-home-adventure'
    },
    {
      id: 'editor',
      name: 'Armar mi regalo familiar',
      tag: 'Modo Creativo • Taller',
      description: 'Taller de fotos familiares, stickers de caras Lego, bloques y dedicatoria.',
      icon: '🎁',
      screens: ['screen-editor'],
      bannerId: 'banner-editor',
      buttonId: 'btn-home-editor'
    }
  ];

  // -------------------------------------------------------------
  // 2. Función Criptográfica SHA-256 Pura (Sin dependencias externas)
  // -------------------------------------------------------------
  function computeSha256(str) {
    function rightRotate(value, amount) {
      return (value >>> amount) | (value << (32 - amount));
    }
    const mathPow = Math.pow;
    const maxWord = mathPow(2, 32);
    let i, j;
    let result = '';
    const words = [];
    const utf8Str = unescape(encodeURIComponent(str));
    const asciiBitLength = utf8Str.length * 8;
    let hash = [];
    const k = [];
    let primeCounter = 0;
    const isComposite = {};

    for (let candidate = 2; primeCounter < 64; candidate++) {
      if (!isComposite[candidate]) {
        for (i = 0; i < 313; i += candidate) {
          isComposite[i] = candidate;
        }
        hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
        k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
      }
    }

    let padded = utf8Str + '\x80';
    while (padded.length % 64 - 56) padded += '\x00';
    for (i = 0; i < padded.length; i++) {
      j = padded.charCodeAt(i);
      words[i >> 2] |= j << ((3 - i) % 4) * 8;
    }
    words[words.length] = (asciiBitLength / maxWord) | 0;
    words[words.length] = asciiBitLength | 0;

    for (j = 0; j < words.length; ) {
      const w = words.slice(j, (j += 16));
      const oldHash = hash.slice(0);
      for (i = 0; i < 64; i++) {
        const w15 = w[i - 15];
        const w2 = w[i - 2];
        const s0 = rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3);
        const s1 = rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10);
        w[i] = i < 16 ? w[i] : (w[i - 16] + s0 + w[i - 7] + s1) | 0;
        const s2 = rightRotate(hash[0], 2) ^ rightRotate(hash[0], 13) ^ rightRotate(hash[0], 22);
        const maj = (hash[0] & hash[1]) ^ (hash[0] & hash[2]) ^ (hash[1] & hash[2]);
        const t2 = s2 + maj;
        const s3 = rightRotate(hash[4], 6) ^ rightRotate(hash[4], 11) ^ rightRotate(hash[4], 25);
        const ch = (hash[4] & hash[5]) ^ (~hash[4] & hash[6]);
        const t1 = hash[7] + s3 + ch + k[i] + w[i];
        hash = [(t1 + t2) | 0].concat(hash);
        hash[4] = (hash[4] + t1) | 0;
        hash.pop();
      }
      for (i = 0; i < 8; i++) hash[i] = (hash[i] + oldHash[i]) | 0;
    }

    for (i = 0; i < 8; i++) {
      for (let b = 3; b >= 0; b--) {
        const byte = (hash[i] >> (b * 8)) & 255;
        result += (byte < 16 ? '0' : '') + byte.toString(16);
      }
    }
    return result;
  }

  // -------------------------------------------------------------
  // 3. Clase TeacherManager
  // -------------------------------------------------------------
  class TeacherManager {
    constructor() {
      this.modules = MODULE_DEFINITIONS;
      this.savedStatus = this.loadSavedStatus();
      this.pendingStatus = { ...this.savedStatus };
      this.isInitialized = false;
      this.unsavedCallback = null;
    }

    /**
     * Carga el estado guardado de los módulos desde localStorage.
     * Si no existe configuración, por defecto todos están habilitados (true).
     */
    loadSavedStatus() {
      const defaults = {
        play: true,
        coding: true,
        adventure: true,
        editor: true
      };

      try {
        const raw = localStorage.getItem(STORAGE_KEYS.STATUS);
        if (raw) {
          const parsed = JSON.parse(raw);
          return {
            play: parsed.play !== false,
            coding: parsed.coding !== false,
            adventure: parsed.adventure !== false,
            editor: parsed.editor !== false
          };
        }
      } catch (e) {
        console.warn('TeacherManager: error al leer estado de módulos, usando valores por defecto', e);
      }
      return defaults;
    }

    /**
     * Carga la configuración de autenticación (sal y hash)
     */
    loadAuthConfig() {
      try {
        const raw = localStorage.getItem(STORAGE_KEYS.AUTH);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && parsed.hash) return parsed;
        }
      } catch (e) {
        console.warn('TeacherManager: error al leer clave guardada, usando clave inicial', e);
      }
      return {
        salt: DEFAULT_SALT,
        hash: DEFAULT_HASH,
        updatedAt: null
      };
    }

    /**
     * Inicializa los escuchadores del DOM y aplica las restricciones iniciales
     */
    init() {
      if (this.isInitialized) return;
      this.isInitialized = true;

      this.bindDOMElements();
      this.applyModuleRestrictions();
      this.enforceActiveScreenRules();

      // Escuchar cambios de hash por si el usuario escribe en la URL
      if (typeof window !== 'undefined' && window.addEventListener) {
        window.addEventListener('hashchange', () => {
          this.enforceActiveScreenRules();
        });
      }
    }

    /**
     * Enlaza eventos y elementos del DOM para el panel docente
     */
    bindDOMElements() {
      // Botón discreto en el pie de página
      const btnOpenLogin = document.getElementById('btn-open-teacher-login');
      if (btnOpenLogin) {
        btnOpenLogin.addEventListener('click', () => {
          if (this.isAuthenticated()) {
            this.openPanel();
          } else {
            this.openLogin();
          }
        });
      }

      // Formulario de login
      const formLogin = document.getElementById('form-teacher-login');
      const btnCancelLogin = document.getElementById('btn-cancel-teacher-login');
      const btnTogglePwd = document.getElementById('btn-toggle-teacher-pwd');
      const pwdInput = document.getElementById('teacher-password-input');

      if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
          e.preventDefault();
          this.handleLoginSubmit();
        });
      }

      if (btnCancelLogin) {
        btnCancelLogin.addEventListener('click', () => {
          this.closeLogin();
        });
      }

      if (btnTogglePwd && pwdInput) {
        btnTogglePwd.addEventListener('click', () => {
          const isPwd = pwdInput.type === 'password';
          pwdInput.type = isPwd ? 'text' : 'password';
          btnTogglePwd.textContent = isPwd ? '🙈' : '👁️';
        });
      }

      // Botones del panel docente
      const btnCloseX = document.getElementById('btn-teacher-close-x');
      const btnCancelChanges = document.getElementById('btn-teacher-cancel-changes');
      const btnSaveChanges = document.getElementById('btn-teacher-save-changes');
      const btnEnableAll = document.getElementById('btn-teacher-enable-all');
      const btnDisableAll = document.getElementById('btn-teacher-disable-all');
      const btnLogout = document.getElementById('btn-teacher-logout');
      const btnOpenChangePwd = document.getElementById('btn-teacher-open-change-pwd');

      if (btnCloseX) {
        btnCloseX.addEventListener('click', () => this.tryClosePanel());
      }
      if (btnCancelChanges) {
        btnCancelChanges.addEventListener('click', () => this.tryClosePanel());
      }
      if (btnSaveChanges) {
        btnSaveChanges.addEventListener('click', () => this.saveChanges());
      }
      if (btnEnableAll) {
        btnEnableAll.addEventListener('click', () => this.enableAll());
      }
      if (btnDisableAll) {
        btnDisableAll.addEventListener('click', () => this.disableAll());
      }
      if (btnLogout) {
        btnLogout.addEventListener('click', () => this.tryLogout());
      }

      // Sub-modal: Cambiar clave
      if (btnOpenChangePwd) {
        btnOpenChangePwd.addEventListener('click', () => this.openChangePasswordModal());
      }

      const formChangePwd = document.getElementById('form-teacher-change-pwd');
      const btnCancelChangePwd = document.getElementById('btn-cancel-change-pwd');
      if (formChangePwd) {
        formChangePwd.addEventListener('submit', (e) => {
          e.preventDefault();
          this.handleChangePasswordSubmit();
        });
      }
      if (btnCancelChangePwd) {
        btnCancelChangePwd.addEventListener('click', () => this.closeChangePasswordModal());
      }

      // Modal de aviso de módulo bloqueado para alumnos
      const btnCloseBlockedNotice = document.getElementById('btn-close-blocked-notice');
      if (btnCloseBlockedNotice) {
        btnCloseBlockedNotice.addEventListener('click', () => this.closeBlockedNotice());
      }

      // Modal de advertencia de cambios sin guardar
      const btnDiscardUnsaved = document.getElementById('btn-discard-unsaved');
      const btnStayUnsaved = document.getElementById('btn-stay-unsaved');
      if (btnDiscardUnsaved) {
        btnDiscardUnsaved.addEventListener('click', () => {
          this.closeUnsavedWarning();
          this.discardChanges();
          if (typeof this.unsavedCallback === 'function') {
            const cb = this.unsavedCallback;
            this.unsavedCallback = null;
            cb();
          } else {
            this.closePanel(true);
          }
        });
      }
      if (btnStayUnsaved) {
        btnStayUnsaved.addEventListener('click', () => {
          this.closeUnsavedWarning();
          this.unsavedCallback = null;
        });
      }

      // Interceptar clics en los banners bloqueados desde el inicio
      this.attachBannerInterceptors();
    }

    /**
     * Intercepta clics en los 4 banners principales cuando están bloqueados
     */
    attachBannerInterceptors() {
      this.modules.forEach(mod => {
        const banner = document.getElementById(mod.bannerId);
        if (banner) {
          banner.addEventListener('click', (e) => {
            if (!this.isModuleEnabled(mod.id)) {
              e.preventDefault();
              e.stopPropagation();
              e.stopImmediatePropagation();
              this.showBlockedNotice(mod.name);
            }
          }, true); // Use capture para interceptar antes que app.js
        }

        const btn = document.getElementById(mod.buttonId);
        if (btn) {
          btn.addEventListener('click', (e) => {
            if (!this.isModuleEnabled(mod.id)) {
              e.preventDefault();
              e.stopPropagation();
              e.stopImmediatePropagation();
              this.showBlockedNotice(mod.name);
            }
          }, true);
        }
      });
    }

    // -----------------------------------------------------------
    // Autenticación y Sesión Docente
    // -----------------------------------------------------------
    isAuthenticated() {
      try {
        const raw = sessionStorage.getItem(STORAGE_KEYS.SESSION);
        if (!raw) return false;
        const session = JSON.parse(raw);
        if (!session || !session.auth) return false;
        // Validar expiración por inactividad
        const now = Date.now();
        if (now - session.timestamp > SESSION_DURATION_MS) {
          this.logout(true);
          return false;
        }
        return true;
      } catch (e) {
        return false;
      }
    }

    setAuthenticatedSession() {
      try {
        sessionStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify({
          auth: true,
          timestamp: Date.now()
        }));
      } catch (e) {}
    }

    clearAuthenticatedSession() {
      try {
        sessionStorage.removeItem(STORAGE_KEYS.SESSION);
      } catch (e) {}
    }

    authenticate(inputPassword) {
      if (!inputPassword || typeof inputPassword !== 'string') {
        return { success: false, error: 'Por favor, ingresá la clave docente.' };
      }
      const authConfig = this.loadAuthConfig();
      const salt = authConfig.salt || DEFAULT_SALT;
      const computedHash = computeSha256(salt + inputPassword.trim());

      if (computedHash === authConfig.hash) {
        this.setAuthenticatedSession();
        return { success: true };
      }
      return { success: false, error: 'Clave incorrecta. Por favor, verificá e intentá nuevamente.' };
    }

    handleLoginSubmit() {
      const pwdInput = document.getElementById('teacher-password-input');
      const errEl = document.getElementById('teacher-login-error');
      if (!pwdInput) return;

      const password = pwdInput.value;
      const res = this.authenticate(password);

      if (res.success) {
        pwdInput.value = '';
        if (errEl) {
          errEl.style.display = 'none';
          errEl.textContent = '';
        }
        this.closeLogin();
        this.openPanel();
      } else {
        if (errEl) {
          errEl.textContent = res.error;
          errEl.style.display = 'block';
        }
        pwdInput.focus();
        pwdInput.select();
      }
    }

    openLogin() {
      const modal = document.getElementById('modal-teacher-login');
      const pwdInput = document.getElementById('teacher-password-input');
      const errEl = document.getElementById('teacher-login-error');
      if (errEl) {
        errEl.style.display = 'none';
        errEl.textContent = '';
      }
      if (pwdInput) {
        pwdInput.value = '';
      }
      if (modal) {
        modal.style.display = 'flex';
        setTimeout(() => {
          if (pwdInput) pwdInput.focus();
        }, 100);
      }
    }

    closeLogin() {
      const modal = document.getElementById('modal-teacher-login');
      if (modal) modal.style.display = 'none';
    }

    logout(silent = false) {
      this.clearAuthenticatedSession();
      this.closePanel(true);
      if (!silent) {
        // Al cerrar sesión, no abre login de inmediato para no molestar,
        // pero la próxima vez que intente acceder solicitará clave
      }
    }

    tryLogout() {
      if (this.hasUnsavedChanges()) {
        this.unsavedCallback = () => {
          this.logout();
        };
        this.openUnsavedWarning();
      } else {
        this.logout();
      }
    }

    // -----------------------------------------------------------
    // Cambio de Clave Docente
    // -----------------------------------------------------------
    changePassword(currentPassword, newPassword, confirmPassword) {
      const authConfig = this.loadAuthConfig();
      const salt = authConfig.salt || DEFAULT_SALT;

      // 1. Validar clave actual
      const currentHash = computeSha256(salt + (currentPassword || '').trim());
      if (currentHash !== authConfig.hash) {
        return { success: false, error: 'La clave actual ingresada es incorrecta.' };
      }

      // 2. Validar nueva clave
      const newTrimmed = (newPassword || '').trim();
      if (newTrimmed.length < 4) {
        return { success: false, error: 'La nueva clave debe tener al menos 4 caracteres.' };
      }

      if (newTrimmed !== (confirmPassword || '').trim()) {
        return { success: false, error: 'La confirmación de la nueva clave no coincide.' };
      }

      // 3. Generar nuevo hash y guardar
      const newHash = computeSha256(salt + newTrimmed);
      const updatedConfig = {
        salt: salt,
        hash: newHash,
        updatedAt: new Date().toISOString()
      };

      try {
        localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(updatedConfig));
        return { success: true };
      } catch (e) {
        return { success: false, error: 'Error al guardar la nueva clave en el almacenamiento local.' };
      }
    }

    openChangePasswordModal() {
      const modal = document.getElementById('modal-teacher-change-pwd');
      const errEl = document.getElementById('teacher-change-pwd-error');
      const f1 = document.getElementById('pwd-current');
      const f2 = document.getElementById('pwd-new');
      const f3 = document.getElementById('pwd-confirm');

      if (errEl) {
        errEl.style.display = 'none';
        errEl.textContent = '';
      }
      if (f1) f1.value = '';
      if (f2) f2.value = '';
      if (f3) f3.value = '';

      if (modal) {
        modal.style.display = 'flex';
        setTimeout(() => {
          if (f1) f1.focus();
        }, 100);
      }
    }

    closeChangePasswordModal() {
      const modal = document.getElementById('modal-teacher-change-pwd');
      if (modal) modal.style.display = 'none';
    }

    handleChangePasswordSubmit() {
      const f1 = document.getElementById('pwd-current');
      const f2 = document.getElementById('pwd-new');
      const f3 = document.getElementById('pwd-confirm');
      const errEl = document.getElementById('teacher-change-pwd-error');

      const res = this.changePassword(
        f1 ? f1.value : '',
        f2 ? f2.value : '',
        f3 ? f3.value : ''
      );

      if (res.success) {
        this.closeChangePasswordModal();
        this.showPanelAlert('success', '🔑 ¡Clave docente actualizada correctamente!');
      } else {
        if (errEl) {
          errEl.textContent = res.error;
          errEl.style.display = 'block';
        }
      }
    }

    // -----------------------------------------------------------
    // Panel de Administración de Módulos
    // -----------------------------------------------------------
    openPanel() {
      // Sincronizar estado pendiente con guardado
      this.savedStatus = this.loadSavedStatus();
      this.pendingStatus = { ...this.savedStatus };

      this.renderModulesList();
      this.updatePanelAlerts();

      const modal = document.getElementById('modal-teacher-panel');
      if (modal) modal.style.display = 'flex';
    }

    renderModulesList() {
      const container = document.getElementById('teacher-modules-list');
      if (!container) return;

      container.innerHTML = '';

      this.modules.forEach(mod => {
        const isEnabled = this.pendingStatus[mod.id] !== false;
        const row = document.createElement('div');
        row.className = `teacher-module-row ${isEnabled ? 'row-enabled' : 'row-blocked'}`;
        row.id = `teacher-row-${mod.id}`;

        row.innerHTML = `
          <div class="teacher-module-info">
            <div class="teacher-module-icon">${mod.icon}</div>
            <div class="teacher-module-texts">
              <div class="teacher-module-name-wrap">
                <strong class="teacher-module-name">${mod.name}</strong>
                <span class="teacher-module-tag">${mod.tag}</span>
              </div>
              <p class="teacher-module-desc">${mod.description}</p>
            </div>
          </div>

          <div class="teacher-module-controls">
            <span class="teacher-status-badge ${isEnabled ? 'status-enabled' : 'status-blocked'}" id="badge-${mod.id}">
              ${isEnabled ? 'HABILITADO' : 'BLOQUEADO'}
            </span>
            <label class="teacher-switch" title="Habilitar o bloquear este módulo">
              <input type="checkbox" class="teacher-toggle-input" data-module="${mod.id}" ${isEnabled ? 'checked' : ''}>
              <span class="teacher-switch-slider"></span>
            </label>
          </div>
        `;

        const toggle = row.querySelector('.teacher-toggle-input');
        if (toggle) {
          toggle.addEventListener('change', (e) => {
            this.setModulePendingStatus(mod.id, e.target.checked);
          });
        }

        container.appendChild(row);
      });
    }

    setModulePendingStatus(moduleId, isEnabled) {
      this.pendingStatus[moduleId] = isEnabled;
      const row = document.getElementById(`teacher-row-${moduleId}`);
      const badge = document.getElementById(`badge-${moduleId}`);

      if (row) {
        row.classList.toggle('row-enabled', isEnabled);
        row.classList.toggle('row-blocked', !isEnabled);
      }

      if (badge) {
        badge.className = `teacher-status-badge ${isEnabled ? 'status-enabled' : 'status-blocked'}`;
        badge.textContent = isEnabled ? 'HABILITADO' : 'BLOQUEADO';
      }

      this.updatePanelAlerts();
    }

    enableAll() {
      this.modules.forEach(mod => {
        this.pendingStatus[mod.id] = true;
      });
      this.renderModulesList();
      this.updatePanelAlerts();
    }

    disableAll() {
      this.modules.forEach(mod => {
        this.pendingStatus[mod.id] = false;
      });
      this.renderModulesList();
      this.updatePanelAlerts();
    }

    hasUnsavedChanges() {
      for (const mod of this.modules) {
        if (this.savedStatus[mod.id] !== this.pendingStatus[mod.id]) {
          return true;
        }
      }
      return false;
    }

    updatePanelAlerts() {
      const pendingAlert = document.getElementById('teacher-pending-alert');
      const saveAlert = document.getElementById('teacher-save-alert');

      if (saveAlert) saveAlert.style.display = 'none';

      if (pendingAlert) {
        pendingAlert.style.display = this.hasUnsavedChanges() ? 'flex' : 'none';
      }
    }

    showPanelAlert(type, message) {
      const saveAlert = document.getElementById('teacher-save-alert');
      const pendingAlert = document.getElementById('teacher-pending-alert');

      if (pendingAlert) pendingAlert.style.display = 'none';

      if (saveAlert) {
        saveAlert.style.display = 'flex';
        saveAlert.innerHTML = `<span>${message}</span>`;
      }
    }

    saveChanges() {
      // 1. Persistir en localStorage
      this.savedStatus = { ...this.pendingStatus };
      try {
        localStorage.setItem(STORAGE_KEYS.STATUS, JSON.stringify(this.savedStatus));
      } catch (e) {
        console.error('Error al guardar configuración docente en localStorage', e);
      }

      // 2. Aplicar restricciones en la interfaz en tiempo real
      this.applyModuleRestrictions();

      // 3. Notificación visual de éxito
      this.showPanelAlert('success', '✅ ¡Configuración guardada con éxito! Los módulos han sido actualizados.');

      // 4. Si el alumno o usuario estaba dentro de un módulo que acaba de ser bloqueado, redirigir
      this.checkAndRedirectIfCurrentScreenBlocked();
    }

    discardChanges() {
      this.pendingStatus = { ...this.savedStatus };
      this.renderModulesList();
      this.updatePanelAlerts();
    }

    tryClosePanel() {
      if (this.hasUnsavedChanges()) {
        this.unsavedCallback = () => {
          this.closePanel(true);
        };
        this.openUnsavedWarning();
      } else {
        this.closePanel(true);
      }
    }

    closePanel(force = false) {
      const modal = document.getElementById('modal-teacher-panel');
      if (modal) modal.style.display = 'none';
      if (force) {
        this.discardChanges();
      }
    }

    openUnsavedWarning() {
      const modal = document.getElementById('modal-teacher-unsaved-warning');
      if (modal) modal.style.display = 'flex';
    }

    closeUnsavedWarning() {
      const modal = document.getElementById('modal-teacher-unsaved-warning');
      if (modal) modal.style.display = 'none';
    }

    // -----------------------------------------------------------
    // Aplicación de Restricciones para los Alumnos
    // -----------------------------------------------------------
    isModuleEnabled(moduleId) {
      return this.savedStatus[moduleId] !== false;
    }

    getModuleForScreen(screenId) {
      if (!screenId) return null;
      for (const mod of this.modules) {
        if (mod.screens.includes(screenId)) {
          return mod;
        }
      }
      return null;
    }

    canAccessScreen(screenId) {
      const mod = this.getModuleForScreen(screenId);
      if (!mod) return true; // Pantallas no pertenecientes a un módulo (ej: screen-home)
      return this.isModuleEnabled(mod.id);
    }

    /**
     * Actualiza la apariencia visual de los banners en screen-home y accesos vinculados
     */
    applyModuleRestrictions() {
      this.modules.forEach(mod => {
        const isEnabled = this.isModuleEnabled(mod.id);
        const banner = document.getElementById(mod.bannerId);
        const btn = document.getElementById(mod.buttonId);

        if (banner) {
          banner.classList.toggle('module-blocked', !isEnabled);
          banner.setAttribute('aria-disabled', !isEnabled ? 'true' : 'false');

          let badge = banner.querySelector('.banner-blocked-badge');
          if (!isEnabled) {
            if (!badge) {
              badge = document.createElement('div');
              badge.className = 'banner-blocked-badge';
              badge.innerHTML = '<span>🔒 No disponible</span>';
              banner.appendChild(badge);
            }
          } else {
            if (badge) badge.remove();
          }
        }

        if (btn) {
          btn.disabled = !isEnabled;
          if (!isEnabled) {
            btn.setAttribute('data-original-html', btn.getAttribute('data-original-html') || btn.innerHTML);
            btn.innerHTML = '<span>🔒</span> No disponible';
          } else {
            const orig = btn.getAttribute('data-original-html');
            if (orig) btn.innerHTML = orig;
          }
        }
      });

      // Actualizar tarjeta de Desafío Final en Temario de Programación si existe
      this.updateSyllabusAdventureCard();
    }

    updateSyllabusAdventureCard() {
      const advCard = document.getElementById('syllabus-adventure-card');
      const btnStartAdv = document.getElementById('btn-start-platformer-adventure');
      const isAdvEnabled = this.isModuleEnabled('adventure');

      if (advCard) {
        advCard.classList.toggle('module-blocked-syllabus', !isAdvEnabled);
        let sylBadge = advCard.querySelector('.syl-blocked-badge');
        if (!isAdvEnabled) {
          if (!sylBadge) {
            sylBadge = document.createElement('span');
            sylBadge.className = 'syl-blocked-badge';
            sylBadge.textContent = '🔒 Bloqueado por el docente';
            advCard.appendChild(sylBadge);
          }
        } else {
          if (sylBadge) sylBadge.remove();
        }
      }

      if (btnStartAdv && !isAdvEnabled) {
        btnStartAdv.classList.add('disabled');
      }
    }

    /**
     * Si el usuario se encuentra actualmente en una pantalla cuyo módulo está bloqueado,
     * lo redirige de inmediato a la pantalla principal (#screen-home) sin perder progreso.
     */
    checkAndRedirectIfCurrentScreenBlocked() {
      const activeScreen = document.querySelector('.screen.active');
      if (!activeScreen) return;

      const mod = this.getModuleForScreen(activeScreen.id);
      if (mod && !this.isModuleEnabled(mod.id)) {
        // Detener sonidos / motores de juego si aplica
        if (global.codingManager && global.codingManager.stopSpeaking) {
          global.codingManager.stopSpeaking();
        }
        if (global.codingManager && global.codingManager.stopBgm) {
          global.codingManager.stopBgm();
        }

        // Redirigir a Home
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        const screenHome = document.getElementById('screen-home');
        if (screenHome) screenHome.classList.add('active');

        // Resetear botones del editor si salimos de él
        document.body.classList.remove('editor-mode');
        const headerActions = document.getElementById('header-gift-actions') || document.querySelector('.header-actions');
        if (headerActions) headerActions.style.setProperty('display', 'none', 'important');

        // Mostrar aviso educativo
        this.showBlockedNotice(
          mod.name,
          `El docente ha pausado temporalmente el módulo "<strong>${mod.name}</strong>" para la clase de hoy.<br>Has regresado al Menú Principal. Tus datos y avances no se han perdido.`
        );
      }
    }

    enforceActiveScreenRules() {
      this.checkAndRedirectIfCurrentScreenBlocked();
    }

    // -----------------------------------------------------------
    // Modal de Aviso de Módulo Bloqueado para Alumnos
    // -----------------------------------------------------------
    showBlockedNotice(moduleName, customMessage = null) {
      const modal = document.getElementById('modal-module-blocked-notice');
      const msgEl = document.getElementById('teacher-blocked-message');

      if (msgEl) {
        if (customMessage) {
          msgEl.innerHTML = customMessage;
        } else {
          msgEl.innerHTML = `
            El módulo "<strong>${moduleName}</strong>" está temporalmente bloqueado por el docente para la clase de hoy.<br>
            ¡Consultale a tu maestra o maestro para saber cuándo estará disponible!
          `;
        }
      }

      if (modal) {
        modal.style.display = 'flex';
      }
    }

    showBlockedNoticeForScreen(screenId) {
      const mod = this.getModuleForScreen(screenId);
      const name = mod ? mod.name : 'este módulo';
      this.showBlockedNotice(name);
    }

    closeBlockedNotice() {
      const modal = document.getElementById('modal-module-blocked-notice');
      if (modal) modal.style.display = 'none';
    }
  }

  // -------------------------------------------------------------
  // 4. Instanciación y Exportación Global
  // -------------------------------------------------------------
  const teacherManager = new TeacherManager();
  global.TeacherManager = TeacherManager;
  global.teacherManager = teacherManager;
  global._computeSha256 = computeSha256; // Exportado para pruebas automatizadas

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => teacherManager.init());
  } else {
    teacherManager.init();
  }

})(typeof window !== 'undefined' ? window : this);
