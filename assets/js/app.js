// Utilities
function getViewportWidth() {
    return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
}

function slugify(str) {
    return typeof str === 'string'
        ? str.replace(/[^a-zA-Z0-9-]/g, '-')
        : str;
}

function getAllBsCollapsibles(selector) {
    var sidebarCollapsibles = document.querySelectorAll(selector);

    return Array.prototype.map.call(sidebarCollapsibles, function (collapsible) {
        return new bootstrap.Collapse(collapsible, { toggle: false });
    });
}

function showAllBsCollapsibles(collapsibles) {
    collapsibles.forEach(function (collapsible) {
        collapsible.show();
    });
}

function hideAllBsCollapsibles(collapsibles) {
    collapsibles.forEach(function (collapsible) {
        collapsible.hide();
    });
}

function toggleAllBsCollapsiblesByViewportWidth(collapsibles, vw, lastVw) {
    vw = vw || getViewportWidth();

    if (lastVw && lastVw === vw) {
        return;
    }

    var isGteMd = vw >= 992;

    if (isGteMd) {
        showAllBsCollapsibles(collapsibles);
    } else {
        hideAllBsCollapsibles(collapsibles)
    }
}

function moveLoginFormBetweenContainers(loginForm, mobileLoginForm, desktopLoginForm, vw, lastVw) {
    if (!loginForm || !mobileLoginFormContainer || !desktopLoginFormContainer) {
        return;
    }

    vw = vw || getViewportWidth();

    if (lastVw && lastVw === vw) {
        return;
    }

    var isGteLg = vw >= 768;

    if (isGteLg) {
        desktopLoginFormContainer.appendChild(loginForm);
    } else {
        mobileLoginFormContainer.appendChild(loginForm);
    }
}

function automaticallyShowInvisibleOffcanvas(elements, vw) {
    vw = vw || getViewportWidth();

    if (lastVw && lastVw === vw) {
        return;
    }

    Array.prototype.forEach.call(elements, function(el) {
        if (!el.dataset.showOn) return;

        var showOn = el.dataset.showOn;

        var expectedWidth = showOn === 'sm' ? 576 : showOn === 'md' ? 768 : showOn === 'lg' ? 992 : showOn === 'xl' ? 1200 : 1400;

        if (vw >= expectedWidth) {
            var instance = bootstrap.Offcanvas.getInstance(el);
            if (!instance) return;

            instance.hide();

            setTimeout(function() {
                el.style.visibility = '';
                el.removeAttribute('aria-hidden');
            }, 305);
        }
    });
}

function scrollGliderToNextPage(gliderInstance, selector, parent) {
    if ((parent || document).querySelector(selector)) {
        gliderInstance.scrollItem(selector);
    } else {
        gliderInstance.scrollItem(0);
    }
}

function addNumberIndicatorsToGliderDots(selector, parent) {
    var dots = (parent || document).querySelectorAll(selector);

    Array.prototype.forEach.call(dots, function (indicator, index) {
        indicator.innerText = index + 1;
    });
}

function hideFFScrollBars(e) {
    // Actualmente 17, puede cambiar con las actualizaciones
    var scrollbarHeight = 17;
    if (/firefox/i.test(navigator.userAgent)) {
        // Aplicar sólo a los equipos de escritorio
        if (window.innerWidth > 575){
            if (e.target.parentNode.classList.contains('glider-wrap')) {
                e.target.parentNode.style.height = (e.target.offsetHeight - scrollbarHeight + 2) + 'px'
            }
        }
    }
}

function saveProduct(productUrl, folderId, callback, callbacks) {
    return fetch('https://sc5.scart.cl:8080/v1/scraping/product', {
        method: 'post',
        body: JSON.stringify({ url: productUrl }),
        headers: {'Content-Type': 'application/json; charset=utf-8'}
    }).then(res => res.json()).then(function (data) {
        if (!data.productId) {
            throw new Error('No se retornó la ID del producto');
        }

        var form = new FormData();
        form.append('scarty_folder', folderId);
        form.append('scarty_product', data.productId);

        fetch('/ajax/products.ajax.php', {
            method: 'post',
            body: form,
            cache: 'no-cache'
        }).then(res => res.json()).then(callback);
    }).catch(function () {
        if (callbacks && typeof callbacks.after) {
            callbacks.after(productUrl, folderId);
        }

        swal({
            title: 'Hemos perdido la conexión con el ecommerce',
            text: 'Vuelve a intentar más tarde',
            icon: 'error',
            button: 'Aceptar'
        });
    });
}

function checkBrowserAgent() {
    return fetch('https://api.duckduckgo.com/?q=useragent&format=json').then(function(res) { return res.json() });
}

/*document.addEventListener('glider-loaded', hideFFScrollBars);
document.addEventListener('glider-refresh', hideFFScrollBars);*/

document.addEventListener('glider-refresh', function (e) {
    var buttonContainer = e.target.parentNode.parentNode
        .querySelector('.carousel__contenedor, .carousel1__contenedor');

    if (buttonContainer) {
        addNumberIndicatorsToGliderDots('.glider-dot', buttonContainer);
    }
});

// Event listeners
// TODO: Eliminar
function listenToClickOnCarouselItem(selector, parent) {
    var items = (parent || document).querySelectorAll(selector);

    Array.prototype.forEach.call(items, function (el) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', function () {
            var destination = el.querySelector('.goto-product');

            if (destination) {
                location.href = destination.href;
            }
        });
    });
}

function listenToSearchBarSubmit(selector) {
    var searchForms = document.querySelectorAll(selector);

    if (!searchForms || !searchForms.length) {
        return;
    }

    Array.prototype.forEach.call(searchForms, function(searchForm) {
        searchForm.addEventListener('submit', function (e) {
            var searchInput = this.querySelector('input[name=q]');

            if (!searchInput) {
                return;
            }

            e.preventDefault();

            var searchTerm = searchInput.value;

            if (searchTerm) {
                window.location.href = '/buscar/' + encodeURIComponent(searchTerm);
            } else {
                swal({
                    text: 'No puedes hacer una búsqueda sin haber ingresado una palabra',
                    icon: 'warning',
                    button: 'Intentar de nuevo',
                });
            }
        });
    });
}

function listenToDeleteFolderClick(selector, deleteCallback) {
    var deleteFolderButtons = document.querySelectorAll(selector);

    Array.prototype.forEach.call(deleteFolderButtons, function (btn) {
        btn.addEventListener('click', function (e) {
            var folderId = Number(this.dataset.folderId);

            if (!folderId) {
                return;
            }

            e.preventDefault();
            var thisBtn = this;

            swal({
                title: '¿Estás seguro?',
                text: 'Una vez eliminada no podrás recuperar el contenido de la carpeta.',
                icon: 'warning',
                buttons: ['Cancelar', 'Sí, eliminar'],
                dangerMode: true,
            }).then((accepted) => {
                if (!accepted) {
                    return;
                }

                var data = new FormData();
                data.append('folder_id', folderId);

                return fetch('/ajax/delete-folder.ajax.php', {
                    method: 'post',
                    body: data
                }).then(res => res.json()).then((res) => {
                    var deleted = res.status === 200;

                    var icon = deleted ? 'success' : 'warning';

                    return swal(res.message, { icon: icon }).then(function () {
                        if (!deleted) {
                            return;
                        }

                        var elementToDeleteId = thisBtn.dataset.deletesElement;

                        if (elementToDeleteId) {
                            var elementToDelete = document.getElementById(elementToDeleteId);

                            if (elementToDelete) {
                                elementToDelete.remove();
                            }
                        }

                        if (deleteCallback) {
                            deleteCallback();
                        }

                        var redirectionUrl = thisBtn.dataset.onDeleteRedirectTo;

                        if (redirectionUrl) {
                            window.location.href = redirectionUrl;
                        }
                    });
                }).catch(() => swal('Error', 'Ha ocurrido un error al eliminar la carpeta', 'error'))
            });
        });
    });
}

function listenToDeleteProductClick(selector, deleteCallback) {
    var deleteProductButtons = document.querySelectorAll(selector);

    Array.prototype.forEach.call(deleteProductButtons, function (btn) {
        btn.addEventListener('click', function (e) {
            var productId = Number(this.dataset.productId);
            var folderId = Number(this.dataset.folderId);

            if (!productId || !folderId) {
                return;
            }

            e.preventDefault();
            var thisBtn = this;

            swal({
                title: '¿Estás seguro?',
                text: 'Una vez eliminado no podrás recibir notificaciones del producto.',
                icon: 'warning',
                buttons: ['Cancelar', 'Sí, eliminar'],
                dangerMode: true,
            }).then((accepted) => {
                if (!accepted) {
                    return;
                }

                var data = new FormData();
                data.append('product_id', productId);
                data.append('folder_id', folderId);

                return fetch('/ajax/delete-product-from-folder.ajax.php', {
                    method: 'post',
                    body: data
                }).then(res => res.json()).then((res) => {
                    var deleted = res.status === 200;

                    var icon = deleted ? 'success' : 'warning';

                    return swal(res.message, { icon: icon }).then(function () {
                        if (!deleted) {
                            return;
                        }

                        var elementToDeleteId = thisBtn.dataset.deletesElement;

                        if (elementToDeleteId) {
                            var elementToDelete = document.getElementById(elementToDeleteId);

                            if (elementToDelete) {
                                elementToDelete.remove();
                            }
                        }

                        if (deleteCallback) {
                            deleteCallback();
                        }

                        var redirectionUrl = thisBtn.dataset.onDeleteRedirectTo;

                        if (redirectionUrl) {
                            window.location.href = redirectionUrl;
                        }
                    });
                }).catch(() => swal('Error', 'Ha ocurrido un error al eliminar el producto', 'error'));
            })
        });
    });
}

function listenToDeleteNotificationClick(selector, callback) {
    var deleteNotificationButtons = document.querySelectorAll(selector);

    Array.prototype.forEach.call(deleteNotificationButtons, function(btn) {
        btn.addEventListener('click', function (e) {
            var productId = this.dataset.productId;
            var folderId = this.dataset.folderId;

            if (!productId || !folderId) {
                return;
            }

            e.preventDefault();

            var thisBtn = this;

            var data = new FormData();
            data.append('update_noti_product', productId);
            data.append('update_noti_folder', folderId);

            return fetch('/ajax/price-notification.ajax.php', {
                method: 'post',
                body: data,
                cache: 'no-cache'
            }).then(res => res.json()).then(function (res) {
                if (res !== 'ok') {
                    throw null;
                }

                var elementToDeleteId = thisBtn.dataset.deletesElement;

                if (elementToDeleteId) {
                    var elementToDelete = document.getElementById(elementToDeleteId);

                    if (elementToDelete) {
                        elementToDelete.remove();
                    }
                }

                if (callback) {
                    callback();
                }
            }).catch(() => swal('Error', 'Ha ocurrido un error al eliminar la notificacion', 'error'));
        })
    });
}

function listenToProfilePictureChange(selectors) {
    var photoControl = document.querySelector(selectors.photoControl);

    if (!photoControl) {
        return;
    }

    var profilePicture = document.querySelector(selectors.profilePicture);
    var updatingProfilePictureWindow = document.querySelector(selectors.updatingProfilePictureWindow);

    photoControl.addEventListener('change', function () {
        var photo = this.files[0];

        if (!photo) {
            return;
        }

        if (updatingProfilePictureWindow) {
            updatingProfilePictureWindow.style.visibility = 'visible';
        }

        var data = new FormData();
        data.append('profile_photo', photo);

        fetch('/ajax/users.ajax.php', {
            method: 'post',
            cache: 'no-cache',
            body: data
        })
            .then((res) => res.text())
            .then((res) => {
                try {
                    var jsonResult = JSON.parse(res);

                    if (typeof jsonResult.error === 'boolean' && typeof jsonResult.message === 'string') {
                        if (jsonResult.error) {
                            if (updatingProfilePictureWindow) {
                                updatingProfilePictureWindow.style.visibility = 'hidden';
                            }

                            return swal({
                                title: 'Error',
                                text: jsonResult.message,
                                icon: 'warning',
                            });
                        } else {
                            if (updatingProfilePictureWindow) {
                                updatingProfilePictureWindow.style.visibility = 'hidden';
                            }

                            return swal({
                                text: jsonResult.message,
                            });
                        }
                    }
                } catch (e) {}

                if (profilePicture) {
                    profilePicture.src = res;
                }

                if (updatingProfilePictureWindow) {
                    updatingProfilePictureWindow.style.visibility = 'hidden';
                }
            });
    });
}

function listenToNotImplementedYetClick(selector, callback) {
    var elements = document.querySelectorAll(selector);

    Array.prototype.forEach.call(elements, function (el) {
        el.addEventListener('click', function (e) {
            e.preventDefault();

            callback();
        });
    });
}

function listenToAddProductSubmit(selectors, callbacks) {
    var form = document.querySelector(selectors.form);

    if (!form) {
        return;
    }

    form.addEventListener('submit', function(e) {
        var urlInput = document.querySelector(selectors.urlInput);
        var folderSelect = document.querySelector(selectors.folderSelect);

        if (!urlInput || !folderSelect) {
            return;
        }

        e.preventDefault();

        var productUrl = urlInput.value;

        if (!productUrl) {
            swal({
                text: 'Debes ingresar el link del producto primero.',
                icon: 'warning',
            });

            return;
        }

        var folderId = folderSelect.value;

        var selectedOption = folderSelect.querySelector(':checked');

        var folderSlugPart = selectedOption
            ? '-' + selectedOption.innerText.replace(/[^a-zA-Z0-9-]/g, '-').toLowerCase()
            : '';

        if (callbacks && typeof callbacks.before) {
            callbacks.before(productUrl, folderId);
        }

        saveProduct(productUrl, folderId, function (result) {
            if (callbacks && typeof callbacks.after) {
                callbacks.after(productUrl, folderId);
            }

            if (result === 'error') {
                swal({
                    title: 'Ha ocurrido un error',
                    text: 'No pudimos agregar el producto. Por favor inténtelo de nuevo más tarde.',
                    icon: 'error',
                    button: 'Aceptar'
                });
            } else if (result.found == 'Found'){
                swal({
                    title: 'Atención',
                    text: 'Ya existe el producto en la carpeta seleccionada',
                    icon: 'warning',
                    content: {
                        element: 'img',
                        attributes: {
                            src: '../' + result.logo
                        }
                    },
                    button: 'Aceptar',
                    className: 'add-product-swal'
                });
            } else if (result.ok == 'ok'){
                swal({
                    title: 'Producto Agregado',
                    text: 'Te estamos redirigiendo a la carpeta del producto guardado',
                    icon: 'success',
                    showCancelButton: false,
                    showConfirmButton: true,
                    closeOnClickOutside: false,
                    content:{
                        element: 'img',
                        attributes: { src: '../' + result.logo}
                    },
                    button: 'Aceptar',
                    className: 'add-product-swal'
                }).then((function () {
                    //window.location.href = 'https://' + location.hostname + '/carpeta/' + folderSlugPart;
                    window.location.href = '/carpeta/' + folderId + folderSlugPart;
                }));
            }
        }, callbacks);
    });
}

function listenToSidebarCollapse(selector) {
    var sidebarCollapsibles = document.querySelectorAll(selector);

    Array.prototype.forEach.call(sidebarCollapsibles, function (el) {
        el.addEventListener('hide.bs.collapse', function (e) {
            var isGteMd = getViewportWidth() >= 992;

            // No permitir "esconder" el contenido en pantallas grandes
            if (isGteMd) {
                e.preventDefault();
            }
        });
    });
}

function listenToSignupModalEmailChange(selectors) {
    var emailInput = document.querySelector(selectors.emailInput);

    if (!emailInput) {
        return;
    }

    emailInput.addEventListener('change', function (e) {
        var email = this.value.trim();

        if (!email) {
            return;
        }

        var thisInput = this;

        var data = new FormData();
        data.append('email', email);

        fetch('/ajax/users.ajax.php', {
            method: 'post',
            cache: 'no-cache',
            body: data
        }).then(res => res.json()).then(function (result) {
            var emailAlert = document.querySelector(selectors.emailAlert);

            if (emailAlert) {
                emailAlert.remove();
            }

            if (!result) {
                return;
            }

            var emailAlertContainer = document.querySelector(selectors.emailAlertContainer);

            if (result && selectors.emailAlert) {
                emailAlertContainer.innerHTML += '<div class="alert alert-danger" id="' + selectors.emailAlert.substring(1) + '" role="alert">Correo en uso</div>';
            }
        });
    });
}

function listenToToggleNotificationClick(selector, callback) {
    var toggleNotificationButtons = document.querySelectorAll(selector);

    Array.prototype.forEach.call(toggleNotificationButtons, function (btn) {
        btn.addEventListener('click', function (e) {
            var productId = Number(this.dataset.productId);

            if (!productId || !this.dataset.notificationStatus) {
                return;
            }

            e.preventDefault();

            // Para transformar "0" a false
            var enabledNotifications = this.dataset.notificationStatus !== '0';
            var newNotificationStatus = enabledNotifications ? '0' : '1';

            var data = new FormData();
            data.append('product_id', productId);
            data.append('enable', newNotificationStatus);

            var previousTabindex = this.getAttribute('tabindex');

            // Para cambiar el estilo a uno "desactivado"
            this.classList.add('disabled');
            this.setAttribute('tabindex', '-1');

            var thisBtn = this;

            return fetch('/ajax/toggle-product-notifications.ajax.php', {
                method: 'post',
                body: data
            }).then(res => res.json()).then((res) => {
                if (res.status === 200) {
                    thisBtn.dataset.notificationStatus = newNotificationStatus;
                }

                if (callback) {
                    callback(thisBtn, productId, newNotificationStatus, res);
                }
            })
                .catch(() => console.error('Ha ocurrido un error al cambiar la configuración de notificaciones del producto ' + productId))
                .finally(() => {
                    this.classList.remove('disabled');

                    if (previousTabindex) {
                        this.setAttribute('tabindex', previousTabindex);
                    } else {
                        this.removeAttribute('tabindex');
                    }
                });
        });
    });
}

function listenToRemoveDisabledAttrClick(selector) {
    var removeDisabledAttrButtons = document.querySelectorAll(selector);

    Array.prototype.forEach.call(removeDisabledAttrButtons, function (btn) {
        btn.addEventListener('click', function (e) {
            var targetSelector = this.dataset.removesDisabledAttrOf;

            if (!targetSelector) {
                return;
            }

            var target = document.querySelector(targetSelector);

            if (!target) {
                return;
            }

            e.preventDefault();

            target.disabled = undefined;
        });
    });
}

/* TODO: Borrar */
function listenToOffcanvasMenuToggle(selector) {
    var togglers = document.querySelectorAll(selector);

    var elementsWithOverlay = document.querySelectorAll('[data-menu-overlay]');

    Array.prototype.forEach.call(elementsWithOverlay, function (element) {
        var overlay = document.querySelector(element.dataset.menuOverlay);

        overlay.addEventListener('click', function () {
            element.classList.toggle('open');
            this.classList.toggle('open-menu');
        });
    });

    Array.prototype.forEach.call(togglers, function (toggler) {
        toggler.addEventListener('click', function (e) {
            var offcanvasMenu = document.querySelector(this.dataset.bsTarget);

            if (!offcanvasMenu) {
                return;
            }

            e.preventDefault();

            offcanvasMenu.classList.toggle('open');

            if (offcanvasMenu.dataset.menuOverlay) {
                var overlay = document.querySelector(offcanvasMenu.dataset.menuOverlay);

                if (overlay) {
                    overlay.classList.toggle('open-menu');
                }
            }
        });
    });
}

function listenToOnChangeSubmit(selector, callbacks) {
    var forms = document.querySelectorAll(selector);

    Array.prototype.forEach.call(forms, function (form) {
        form.addEventListener('change', function () {
            if (typeof callbacks === 'object' && typeof callbacks.before === 'function') {
                callbacks.before(this);
            }

            this.submit();

            if (typeof callbacks === 'object' && typeof callbacks.before === 'function') {
                callbacks.before(this);
            }
        });
    });
}

function openModalIfUrlHasFragment() {
    var selector = location.hash;

    if (!selector) {
        return;
    }

    var modalEl = document.querySelector(selector);

    if (!modalEl || !modalEl.classList.contains('modal')) {
        return;
    }

    if (typeof bootstrap === 'object' && typeof bootstrap.Modal === 'function') {
        var modal = new bootstrap.Modal(modalEl);
        modal.show();
    }
}

function openSetNewPasswordModalIfExists(selector) {
    var modalEl = document.querySelector(selector);

    if (modalEl) {
        var modal = new bootstrap.Modal(modalEl, {
            keyboard: false,
            backdrop: 'static'
        });
        modal.show();
    }
}

function listenToNewPasswordChange(selectors) {
    var newPassword = document.querySelector(selectors.mainInput);
    var newPasswordConfirm = document.querySelector(selectors.confirmInput);

    if (!newPassword || !newPasswordConfirm || !selectors.alertContainer || !selectors.alert) {
        return;
    }

    newPasswordConfirm.addEventListener('change', function () {
        var passwordAlertContainer = document.querySelector(selectors.alertContainer);
        var passwordAlert = document.querySelector(selectors.alert);

        var newPasswordValue = newPassword.value;
        var newPasswordConfirmValue = this.value;

        if (newPasswordValue === newPasswordConfirmValue) {
            if (passwordAlert) {
                passwordAlert.remove();
            }
        } else {
            if (passwordAlert) {
                passwordAlert.remove();
            }

            if (passwordAlertContainer) {
                passwordAlertContainer.innerHTML = '<div class="alert alert-danger" role="alert" id ="' + (selectors.alert.substring(1)) + '">Las contraseñas no coinciden</div>';
            }
        }
    })
}

function showIncompatibleBrowserMessage(message, options) {
    if (typeof options.ignoreIfPathMatches === 'function' && options.ignoreIfPathMatches(location.pathname)) {
        return;
    }

    if (typeof options.showOnlyIfPathMatches === 'function' && !options.showOnlyIfPathMatches(location.pathname)) {
        return;
    }

    checkBrowserAgent().then(function(res) {
        if (res['Answer'].includes('Brave')) {
            var messagesContainer = document.querySelector(options.messagesContainerSelector || '.site-messages-container');

            var messageContainer = document.createElement('div');
            messageContainer.innerHTML = message;
            //messageContainer.classList.add('position-fixed', 'bottom-0', 'start-0', 'bg-white', 'px-3', 'px-lg-4', 'py-2', 'py-lg-3');
            messageContainer.classList.add('alert', 'alert-warning');
            /*messageContainer.style.zIndex = 2000;
            document.body.style.marginBottom = Number(document.body.style.marginBottom) + 56 + 'px';*/

            if (messagesContainer) {
                messagesContainer.appendChild(messageContainer);
            } else {
                document.body.insertBefore(messageContainer, document.body.firstChild);
            }
        }
    });
}

function openLoginModal(title, message, onClose) {
    var modalEl = document.querySelector('#iniciar-sesion.modal');

    if (!modalEl) {
        console.warn('Se intent{o abrir el modal de inicio de sesión, pero este no se encontró.');
        return Promise.resolve(null);
    }

    const titleContainer = modalEl.querySelector('.modal-title');

    if (titleContainer) {
        titleContainer.textContent = title || titleContainer.dataset.defaultText;
    }

    const messageContainer = modalEl.querySelector('.modal-message');

    if (messageContainer) {
        messageContainer.textContent = message || messageContainer.dataset.defaultText;
    }

    var modal = bootstrap.Modal.getOrCreateInstance(modalEl);
    modal.show();

    const closeHandler = function () {
        onClose && onClose(modal);

        if (titleContainer) {
            titleContainer.textContent = titleContainer.dataset.defaultText;
        }

        if (messageContainer) {
            messageContainer.textContent = messageContainer.dataset.defaultText;
        }

        // Hace que esta función se llame sólo una vez
        modalEl.removeEventListener('hidden.bs.modal', closeHandler);
    };

    // Para resetear el título y mensaje cuando se cierre el modal, junto con
    // llamar el callback definido en `onClose`
    modalEl.addEventListener('hidden.bs.modal', closeHandler);
}

/* Closure para Glider principal */
(function (w, d) {
    var autoScrollInterval, carousel, glider, gliders = {}, lastScrollTime;
    var listSelector = '.carousel__lista';

    function updateLastScrollTime() {
        lastScrollTime = Date.now();
    }

    function scrollPeriodically() {
        var now = Date.now();
        var timeEllapsed = now - (lastScrollTime);

        if (timeEllapsed < 5000) {
            return;
        }

        scrollGliderToNextPage(
            glider,
            '.carousel__elemento.glider-slide.right-1:not(.visible), .carousel__elemento.glider-slide.right-2:not(.visible), .carousel__elemento.glider-slide.right-3:not(.visible)', // Nuevo
            carousel
        );
        lastScrollTime = now;
    }

    function initializeGlider(carousel) {
        var container = d.querySelector('.carousel__contenedor + .carousel__contenedor'); // Nuevo
        //var dots = container.querySelector('.carousel__indicadores');
        var arrows = {
            prev: carousel.parentNode.querySelector('.carousel__anterior') || container.querySelector('.carousel__anterior'), // Nuevo
            next: carousel.parentNode.querySelector('.carousel__siguiente') || container.querySelector('.carousel__siguiente') // Nuevo
        };

        var slidesPerBreakpoint = {
            xs: carousel.dataset.slidesPerPage || 2,
            sm: carousel.dataset.slidesPerPageSm || carousel.dataset.slidesPerPage || 3,
            md: carousel.dataset.slidesPerPageMd || carousel.dataset.slidesPerPageSm || carousel.dataset.slidesPerPage || 3,
            lg: carousel.dataset.slidesPerPageLg || carousel.dataset.slidesPerPageMd || carousel.dataset.slidesPerPageSm || carousel.dataset.slidesPerPage || 3,
            xl: carousel.dataset.slidesPerPageXl || carousel.dataset.slidesPerPageLg || carousel.dataset.slidesPerPageMd || carousel.dataset.slidesPerPageSm || carousel.dataset.slidesPerPage || 3,
            xxl: carousel.dataset.slidesPerPageXxl || carousel.dataset.slidesPerPageXl || carousel.dataset.slidesPerPageLg || carousel.dataset.slidesPerPageMd || carousel.dataset.slidesPerPageSm || carousel.dataset.slidesPerPage || 3,
        };

        var glider = new Glider(carousel, {
            slidesToShow: 3,
            slidesToScroll: 1,
            //dots: dots,
            arrows: arrows,
            responsive: [
                {
                    // screens greater than >= 0
                    breakpoint: 0,
                    settings: {
                        slidesToShow: Number(slidesPerBreakpoint.xs),
                        slidesToScroll: 1
                    }
                },
                {
                    // screens greater than >= 400px
                    breakpoint: 400,
                    settings: {
                        slidesToShow: Number(slidesPerBreakpoint.xs),
                        slidesToScroll: 1,

                    }
                },
                {
                    // screens greater than >= 576px
                    breakpoint: 576,
                    settings: {
                        slidesToShow: Number(slidesPerBreakpoint.sm),
                        slidesToScroll: 1
                    }
                },
                {
                    // screens greater than >= 768px
                    breakpoint: 768,
                    settings: {
                        slidesToShow: Number(slidesPerBreakpoint.md),
                        slidesToScroll: 1
                    }
                },
                {
                    // screens greater than >= 992px
                    breakpoint: 992,
                    settings: {
                        slidesToShow: Number(slidesPerBreakpoint.lg),
                        slidesToScroll: 1
                    }
                },
                {
                    // screens greater than >= 1200px
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: Number(slidesPerBreakpoint.xl),
                        slidesToScroll: 1
                    }
                },
                {
                    // screens greater than >= 1400px
                    breakpoint: 1400,
                    settings: {
                        slidesToShow: Number(slidesPerBreakpoint.xxl),
                        slidesToScroll: 1
                    }
                }
            ],
            rewind: true,
            draggable: true,
            dragVelocity: 1,
        });

        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
        }

        lastScrollTime = Date.now();
        carousel.addEventListener('glider-animated', updateLastScrollTime);
        carousel.addEventListener('glider-slide-visible', updateLastScrollTime);
        carousel.addEventListener('glider-slide-hidden', updateLastScrollTime);
        autoScrollInterval = setInterval(scrollPeriodically, carousel.dataset.autoScrollInterval || 1000);

        return glider;
    }

    // Inicializa el carousel ya estructurado desde PHP
    function init() {
        if (carousel) {
            carousel.classList.add('d-none');

            if (carousel.parentNode && carousel.parentNode.classList.contains('glider-wrap')) {
                carousel.parentNode.classList.add('d-none');
            }
        }

        var checkedDay = d.querySelector('[name=offer-day]:checked');
        var daysToRetrieveOffers = checkedDay ? checkedDay.value : '7days';

        var selectedCarouselSelector = listSelector + '[data-scart-offers-from-last="' + daysToRetrieveOffers + '"]';
        carousel = d.querySelector(selectedCarouselSelector);

        if (!carousel) {
            return;
        }

        carousel.classList.remove('d-none');

        if (carousel.parentNode && carousel.parentNode.classList.contains('glider-wrap')) {
            carousel.parentNode.classList.remove('d-none');
        }

        // Si ya hay un glider inicializado en la caché, retornarlo
        if (gliders[daysToRetrieveOffers]) {
            glider = gliders[daysToRetrieveOffers];
            glider.scrollTo(0);
            return;
        }

        if (glider) {
            // Si ya hay un glider inicializado, lo guarda en la caché
            gliders[daysToRetrieveOffers] = glider;
        }

        glider = initializeGlider(carousel);
    }

    init();

    var offersDaysTogglerSelector = (carousel && carousel.dataset.daysTogglerSelector) || '#offers-days-selector';

    var offersDaysToggler = d.querySelector(offersDaysTogglerSelector);

    if (offersDaysToggler) {
        offersDaysToggler.addEventListener('change', init);
    }
})(window, document);

/* Closure para Gliders */
(function (w, d) {
    var carousels = d.querySelectorAll('.carousel1__lista');

    Array.prototype.forEach.call(carousels, function (carousel) {
        var lastScrollTime;

        function updateLastScrollTime() {
            lastScrollTime = Date.now();
        }

        function scrollPeriodically() {
            var now = Date.now();
            var timeEllapsed = now - lastScrollTime;

            if (timeEllapsed < 5000) {
                return;
            }

            scrollGliderToNextPage(
                glider,
                '.carousel1__elemento.glider-slide.right-3:not(.visible)',
                carousel
            );
            lastScrollTime = now;
        }

        // Nuevo
        var indicatorsContainer = (carousel.parentNode.parentNode.parentNode.classList.contains('carousel1__contenedor')
            ? carousel.parentNode.parentNode.parentNode
            : carousel.parentNode.parentNode.parentNode.querySelector('.carousel1__contenedor')) || carousel.parentNode.parentNode.parentNode.parentNode.querySelector('.carousel1__contenedor');

        //var dots = indicatorsContainer.querySelector('.carousel1__indicadores');
        var arrows = {
            prev: indicatorsContainer.querySelector('.carousel1__anterior'),
            next: indicatorsContainer.querySelector('.carousel1__siguiente')
        };

        var slidesPerBreakpoint = {
            xs: carousel.dataset.slidesPerPage || 1,
            sm: carousel.dataset.slidesPerPageSm || carousel.dataset.slidesPerPage || 1,
            md:
                carousel.dataset.slidesPerPageMd ||
                carousel.dataset.slidesPerPageSm ||
                carousel.dataset.slidesPerPage ||
                2,
            lg:
                carousel.dataset.slidesPerPageLg ||
                carousel.dataset.slidesPerPageMd ||
                carousel.dataset.slidesPerPageSm ||
                carousel.dataset.slidesPerPage ||
                3,
            xl:
                carousel.dataset.slidesPerPageXl ||
                carousel.dataset.slidesPerPageLg ||
                carousel.dataset.slidesPerPageMd ||
                carousel.dataset.slidesPerPageSm ||
                carousel.dataset.slidesPerPage ||
                3,
            xxl:
                carousel.dataset.slidesPerPageXxl ||
                carousel.dataset.slidesPerPageXl ||
                carousel.dataset.slidesPerPageLg ||
                carousel.dataset.slidesPerPageMd ||
                carousel.dataset.slidesPerPageSm ||
                carousel.dataset.slidesPerPage ||
                3,
        };

        var glider = new Glider(carousel, {
            slidesToShow: 3,
            slidesToScroll: 1,
            //dots: dots,
            arrows: arrows,
            responsive: [
                {
                    // screens greater than >= 0
                    breakpoint: 0,
                    settings: {
                        slidesToShow: Number(slidesPerBreakpoint.xs),
                        slidesToScroll: 1
                    }
                },
                {
                    // screens greater than >= 576px
                    breakpoint: 576,
                    settings: {
                        slidesToShow: Number(slidesPerBreakpoint.sm),
                        slidesToScroll: 1
                    }
                },
                {
                    // screens greater than >= 768px
                    breakpoint: 768,
                    settings: {
                        slidesToShow: Number(slidesPerBreakpoint.md),
                        slidesToScroll: 1
                    }
                },
                {
                    // screens greater than >= 992px
                    breakpoint: 992,
                    settings: {
                        slidesToShow: Number(slidesPerBreakpoint.lg),
                        slidesToScroll: 1
                    }
                },
                {
                    // screens greater than >= 1200px
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: Number(slidesPerBreakpoint.xl),
                        slidesToScroll: 1
                    }
                },
                {
                    // screens greater than >= 1400px
                    breakpoint: 1400,
                    settings: {
                        slidesToShow: Number(slidesPerBreakpoint.xxl),
                        slidesToScroll: 1
                    }
                }
            ],
            rewind: true,
            draggable: true,
            dragVelocity: 1,
        });

        var lastScrollTime = Date.now();
        carousel.addEventListener('glider-animated', updateLastScrollTime);
        carousel.addEventListener('glider-slide-visible', updateLastScrollTime);
        carousel.addEventListener('glider-slide-hidden', updateLastScrollTime);
        autoScrollInterval = setInterval(scrollPeriodically, carousel.dataset.autoScrollInterval || 1000);
    });
})(window, document);

/* START Core */
var collapsibles = getAllBsCollapsibles('.sidebar-collapse-body');

var loginForm = document.querySelector('#login-form');
var desktopLoginFormContainer = document.querySelector('#desktop-login-form-container');
var mobileLoginFormContainer = document.querySelector('#mobile-login-form-container');

var lastVw = getViewportWidth();
var offCanvases = document.querySelectorAll('.offcanvas');

toggleAllBsCollapsiblesByViewportWidth(collapsibles);
moveLoginFormBetweenContainers(loginForm, mobileLoginFormContainer, desktopLoginFormContainer);
window.addEventListener('resize', function () {
    var vw = getViewportWidth();

    toggleAllBsCollapsiblesByViewportWidth(collapsibles, vw, lastVw);
    moveLoginFormBetweenContainers(loginForm, mobileLoginFormContainer, desktopLoginFormContainer, vw, lastVw);
    automaticallyShowInvisibleOffcanvas(offCanvases, vw);

    lastVw = vw;
});

listenToSearchBarSubmit('.scart-search-form, #scart-search-form');

listenToDeleteFolderClick('.deletes-folder', function () {
    var folderList = document.querySelector('#folder-list');

    if (!folderList) {
        return;
    }

    if (!folderList.children || !folderList.children.length) {
        var noFoldersToListNotice = document.querySelector('#no-folders-to-list-notice');

        if (noFoldersToListNotice) {
            noFoldersToListNotice.classList.remove('d-none');
        }

        location.href = location.href;
    }
});
listenToDeleteProductClick('.deletes-product', function () {
    var productList = document.querySelector('#product-list');

    if (!productList) {
        return;
    }

    if (!productList.children || !productList.children.length) {
        var noProductsToListNotice = document.querySelector('#no-products-to-list-notice');

        if (noProductsToListNotice) {
            noProductsToListNotice.classList.remove('d-none');
        }
    }
});
listenToDeleteNotificationClick('.deletes-notification');
listenToProfilePictureChange({
    photoControl: '#photoForm',
    profilePicture: '#sidebar-profile-picture',
    updatingProfilePictureWindow: '#updating-profile-picture-window'
});
listenToNotImplementedYetClick('.not-implemented-yet', function () {
    swal('No implementada', 'Esta característica aún no está implementada, ¡pero estará lista pronto!', 'info');
});
listenToAddProductSubmit({
    form: '#add-product-form',
    urlInput: '#product-url-input',
    folderSelect: '#target-folder-select'
}, {
    before: function () {
        var loadingProductInfoWindow = document.querySelector('#loading-product-info-window');

        if (loadingProductInfoWindow) {
            loadingProductInfoWindow.classList.remove('d-none');
        }
    },
    after: function () {
        var loadingProductInfoWindow = document.querySelector('#loading-product-info-window');

        if (loadingProductInfoWindow) {
            loadingProductInfoWindow.classList.add('d-none');
        }
    }
})
listenToSidebarCollapse('.sidebar-collapse-body');
listenToSignupModalEmailChange({
    emailInput: '#register_mailbox',
    emailAlert: '#registrate-email-message',
    emailAlertContainer: '#registrate-mail-message-container'
});
listenToToggleNotificationClick('.toggles-product-notifications', function (trigger, productId, newStatus, res) {
    if (401 === res.status) {
        openLoginModal('Inicia sesión', 'Para realizar esta acción debes iniciar sesión primero.');
        return;
    } else if (400 === res.status) {
        swal({ text: res.message, icon: 'warning', button: 'Entiendo' });
        return;
    }

    var enabled = newStatus !== '0';

    if (enabled) {
        trigger.classList.add('notifications--enabled');
        trigger.classList.remove('notifications--disabled');
    } else {
        trigger.classList.add('notifications--disabled');
        trigger.classList.remove('notifications--enabled');
    }
});
listenToRemoveDisabledAttrClick('[data-removes-disabled-attr-of]');
//listenToOffcanvasMenuToggle('[data-bs-toggle="offcanvas"]'); // TODO: Eliminar
listenToOnChangeSubmit('form.on-change-submit', {
    before: function(form) {
        if (form.classList.contains('sort-results-form')) {
            var selectedOrder = form.querySelector('[data-filter-control="sort-by"] :checked');

            if (!selectedOrder || !selectedOrder.dataset.defaultOrder) {
                return;
            }

            var orderInput = form.querySelector('[data-filter-control="order"]');

            if (!orderInput) {
                return;
            }

            orderInput.value = selectedOrder.dataset.defaultOrder;
        }
    }
});
openModalIfUrlHasFragment();
openSetNewPasswordModalIfExists('#set-new-password-modal');
listenToNewPasswordChange({
    mainInput: '#reset_password',
    confirmInput: '#reset_password_confirm',
    alertContainer: '#set-new-password-confirm-alert-container',
    alert: '#set-new-password-confirm-alert',
});
/* END Core */

/* START Usability */
var tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
var tooltipList = Array.prototype.map.call(tooltipTriggerList, function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});
showIncompatibleBrowserMessage(
    'Es posible que algunas características no funcionen correctamente en tu navegador. Para tener una mejor experiencia, te recomendamos utilizar <a target="_blank" href="https://www.mozilla.org/es-CL/firefox/download/">Mozilla Firefox</a> o <a target="_blank" href="https://www.google.com/chrome/">Google Chrome</a> al utilizar Scart.',
    {
        showOnlyIfPathMatches: function(path) {
            return path.startsWith('/producto') || path.startsWith('/resultado-busqueda') || path === '/ecommerce/dashboard' || path === '/ecommerce/estadisticas-generales' || (path.startsWith('/ecommerce/producto') && !path.startsWith('/ecommerce/productos'));
        }
    }
);

if (lastVw >= 768) {
    Array.prototype.forEach.call(document.querySelectorAll('.auto-open-dropdown'), function (dropdownToggleEl) {
        var autoClose = dropdownToggleEl.dataset.bsAutoClose;

        if (autoClose === 'true') {
            autoClose = true;
        } else if (autoClose === 'false') {
            autoClose = false;
        }

        var dropdown = new bootstrap.Dropdown(dropdownToggleEl, {
            autoClose: autoClose
        });

        dropdown && dropdown.show();
    });
}
(function(d) {
    var floatingLoginFormHider = d.querySelectorAll('[data-hides-floating-login-form]');

    Array.prototype.forEach.call(floatingLoginFormHider, function(el) {
        el.addEventListener('click', function() {
            var loginFormToggler = bootstrap.Dropdown.getInstance(d.querySelector(this.dataset.hidesFloatingLoginForm));

            if (!loginFormToggler) {
                return;
            }

            loginFormToggler.hide();
        });
    });
})(document);
/* END Usability */