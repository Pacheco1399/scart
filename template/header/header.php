<script src="https://cdn.jsdelivr.net/npm/sweetalert@2.1.2/dist/sweetalert.min.js"></script>

<div class="parte-1 menu-fixed">
    <header>        <!-- Inicio barra de navegación -->
        <nav class="navbar navbar-expand-md navbar-dark">
            <div class="container">
                <a class="logo navbar-brand" href="/"><img src="../../assets/img/new/logo-blanco.svg"
                                                           alt="Logo de Scart"></a>


                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#scart-navbar-menu" aria-controls="scart-navbar-menu" aria-expanded="false"
                        aria-label="Alternar menú de navegación">
                    <i class="fas fa-bars" aria-hidden="true"></i>
                </button>

                <div class="collapse navbar-collapse" id="scart-navbar-menu">
                    <ul class="navbar-nav my-2 my-lg-0 ms-lg-3 ms-xl-5 w-100 justify-content-lg-between">
                        <li class="nav-item boton-nav">
                            <a class="nav-link" href="/categoria/2-telefonia">TELEFONÍA</a>
                        </li>
                        <li class="nav-item boton-nav">
                            <a class="nav-link" href="/categoria/3-tecnologia">TECNOLOGÍA</a>
                        </li>
                        <li class="nav-item boton-nav">
                            <a class="nav-link" href="/categoria/4-calzado">CALZADO</a>
                        </li>
                        <li class="nav-item boton-nav">
                            <a class="nav-link" href="/categoria/5-mujer">MUJER</a>
                        </li>
                        <li class="nav-item boton-nav">
                            <a class="nav-link" href="/categoria/6-hombre">HOMBRE</a>
                        </li>
                        <li class="nav-item boton-nav">
                            <a class="nav-link" href="/categoria/7-deportes">DEPORTES</a>
                        </li>
                        <li class="nav-item boton-nav">
                            <a class="nav-link" href="/categoria/8-hogar">HOGAR</a>
                        </li>
                        <li class="nav-item boton-nav">
                            <a class="nav-link" href="/categoria/9-musica">MÚSICA</a>
                        </li>
                    </ul>
                    <div id="mobile-login-form-container" class="d-lg-none"></div>
                </div>

            </div>
        </nav>
        <!-- Termino barra de navegación -->

        <!-- Inicio barra de busqueda -->
        <div class="container">
            <div class="row gx-3 gx-md-4 gy-3">
                <div class="col-4 col-sm-3 col-xl-2 d-none d-md-flex">
                    <div class="dropdown d-flex flex-fill">
                        <button class="nav-link mis-carpetas flex-fill d-flex align-items-center justify-content-center auto-open-dropdown border-0 floating-login-form-toggler"
                                data-bs-target="#login-form" type="button" data-bs-toggle="dropdown"
                                data-bs-auto-close="false" aria-expanded="false">
                            REGÍSTRATE
                        </button>

                        <div class="dropdown-menu py-0 border-0 shadow" style="border-radius: 20px">
                            <div class="position-relative" id="desktop-login-form-container">
                                <div id="login-form" class="card h-100 inicio-sesion border-0" style="min-width: 350px">
                                    <div class="card-body h-100">
                                        <div class="d-flex flex-column justify-content-between h-100">
                                            <form method="post">
                                                <h5 class="card-title">Bienvenido a<br> <b>SCART</b></h5>
                                                <input type="hidden" name="form_name" value="user_login_form">
                                                <div class="form-group">
                                                    <input type="email" class="form-control" name="login_mailbox"
                                                           placeholder="Email" required tabindex="3" value=""/>
                                                </div>
                                                <div>
                                                    <input type="password" class="form-control" name="login_password"
                                                           placeholder="Contraseña" required tabindex="3"/>
                                                </div>
                                                <a class="text-secondary-scart" href="#restablecer-contrasena"
                                                   data-bs-toggle="modal" tabindex="3">¿Olvidaste tu contraseña?</a>
                                                <button type="submit" name="btn-login"
                                                        class="boton-inicio btn btn-primary" tabindex="3">Iniciar sesión
                                                </button>
                                                <hr/>
                                                <a href="https://www.facebook.com/v2.10/dialog/oauth?client_id=458730155145323&state=a2ef1796cd9adb9e8fdb598c50c99bdc&response_type=code&sdk=php-sdk-5.7.0&redirect_uri=https%3A%2F%2Fscart.cl&scope=public_profile%2Cemail"
                                                   class="boton-inicio-facebook btn d-inline-flex justify-content-center align-items-center mx-auto"
                                                   tabindex="3">
                                                    <i class="fab fa-facebook-square me-2"></i>
                                                    Inicia sesión con Facebook
                                                </a>
                                            </form>
                                            <div>
                                                <div>
                                                    <p class="mb-0">¿Aún no tienes una cuenta?</p>
                                                    <p class="mb-0">Regístrate GRATIS <a
                                                                class="text-decoration-underline mx-0 text-secondary-scart"
                                                                href="#registrate" data-bs-toggle="modal">aquí</a>.</p>
                                                </div>
                                                <button class="boton-inicio boton-registro btn btn-primary text-white"
                                                        data-bs-toggle="modal" data-bs-target="#registrate"
                                                        tabindex="3">Regístrarte
                                                </button>
                                                <a class="text-decoration-underline link-empresas text-secondary-scart"
                                                   href="/ecommerce" tabindex="3">¿Eres una empresa?</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button class="close btn btn-secondary-scart text-white rounded-circle position-absolute top-0 start-100 translate-middle"
                                        type="button" data-bs-dismiss="dropdown"
                                        aria-label="Cerrar formulario de inicio de sesión" style="z-index: 2"
                                        data-hides-floating-login-form=".floating-login-form-toggler">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-8 col-sm-6 col-lg-7 col-xl-8 flex-fill">
                    <div class="h-100 busqueda buscar d-flex align-items-center overflow-hidden m-0">
                        <form class="w-100 h-100 mb-0" action="/buscar" method="get" id="scart-search-form">
                            <div class="d-flex align-items-center h-100">
                                <button class="ps-2" aria-label="Realizar búsqueda"><i class="fas fa-search"
                                                                                       aria-hidden="true"></i></button>
                                <input class="espacio-busqueda py-2 pe-1 h-100" type="search" id="search" name="q"
                                       placeholder="Buscar producto o categoría" value="">
                            </div>
                        </form>
                    </div>
                </div>
                <!--<div class="<? /*=isLoggedIn() ? 'col-6' : 'col-12 col-sm-3'*/ ?> col-lg-2 d-none d-md-block">-->
                <div class="col-auto ">
                    <div class="h-100 iconos">
                        <a href="#iniciar-sesion" data-bs-toggle="modal" aria-label="Iniciar sesión"
                           title="Iniciar sesión"><img height="20" src="../../assets/img/new/icon-perfil.svg"
                                                       alt="Ícono de usuario" aria-hidden="true"/></a>
                    </div>
                </div>
            </div>
        </div>
        <!-- Termino barra de busqueda -->

        <div class="container d-md-none mt-2 pt-1 pb-0 navbar">
            <div class="boton-registrate-1 mx-auto w-100">
                <a class="nav-link registrate mx-auto" href="#registrate" data-bs-toggle="modal">REGÍSTRATE</a>
            </div>
        </div>
    </header>
</div>