<div class="parte-1 menu-fixed pt-2">
    <header>
        <!-- Inicio barra de navegación -->
        <nav class="navbar navbar-expand-md navbar-dark ">
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

                <div class=" carpetas col-12 col-sm-2 col-lg-2 col-xl-2 d-md-flex">
                    <a class="nav-link mis-carpetas d-flex align-items-center justify-content-center flex-fill"
                       href="/mis-carpetas">
                        <i class="far fa-folder"></i>
                        MIS CARPETAS
                    </a>
                </div>

                <div class="col-10 col-sm-10 col-lg-5 col-xl-5">
                    <div class="h-100 busqueda buscar  align-items-center overflow-hidden m-0">
                        <form class="w-100 h-100 mb-0" action="/buscar" method="get" id="scart-search-form">
                            <div class="d-flex align-items-center h-100">

                                <input class="espacio-busqueda ms-3 py-2 pe-1" type="search" id="search" name="q"
                                       placeholder="Buscar producto o categoría" value="">
                                <button class="me-2 ps-2" aria-label="Realizar búsqueda"><i class="fas fa-search"
                                                                                            aria-hidden="true"></i>
                                </button>

                            </div>
                        </form>
                    </div>
                </div>


                     <div class="login-button col-2">
                         <div class="h-100  d-flex align-items-center overflow-hidden m-0">
                             <form class="w-100 h-100 mb-0" action="/buscar" method="get" id="scart-search-form">
                                 <div class="d-flex align-items-center h-100">



                                     <button class=" login-icon-button me-2 ps-2" aria-label="Iniciar sesión"><i class="fas fa-user"
                                                                                                 aria-hidden="true"></i>
                                     </button>



                                 </div>

                             </form>
                         </div>
                     </div>


                     <div class="register col-12 col-sm-12 col-lg-2 col-xl-2 ">

                         <a href="#" class="register-text nav-link d-flex align-items-center justify-content-center flex-fill">
                             <label>REGISTRATE</label>
                         </a>


                     </div>

                <div class="cupones col-12 col-sm-2 col-lg-2 col-xl-2">

                    <a href="#" class="nav-link btn-cupones d-flex align-items-center justify-content-center flex-fill">
                        <img alt="" style="width: 25px; height: 20px;" src="../../assets/img/new/icon-ticket.png">
                        <label>CUPONES</label>
                    </a>


                </div>

                <div class="offers  col-6 col-sm-1 col-lg-1 col-xl-1    ">
                    <div class="h-100 ofertas">
                        <a class="ms-0 me-2" href="/notificaciones">OFERTAS</a>
                        <div class="numero">0</div>
                    </div>
                </div>

                <div class=" user-panel col-6 col-sm-2 col-lg-2 col-xl-2">
                    <div class="h-100 iconos">
                        <a href="/notificaciones" aria-label="Ver mis notificaciones"><img height="18"
                                                                                           src="../../assets/img/new/icon-campana.svg"
                                                                                           alt="Ícono de campana"
                                                                                           aria-hidden="true"/></a>
                        <div class="dropdown">
                            <a href="/perfil" aria-label="Mostrar menú de usuario" id="header-user-menu-toggler"
                               data-bs-toggle="dropdown" aria-expanded="false"><img height="20"
                                                                                    src="../../assets/img/new/icon-perfil.png"
                                                                                    alt="Ícono de usuario"
                                                                                    aria-hidden="true"/></a>
                            <ul class="dropdown-menu" aria-labelledby="header-user-menu-toggler">
                                <li><a class="dropdown-item" href="/perfil">Ver perfil</a></li>
                                <li><a class="dropdown-item" href="/cerrarsesion">Cerrar sesión</a></li>
                            </ul>
                        </div>
                        <a href="#" aria-label="Ver mis carpetas"><img height="20"
                                                                       src="../../assets/img/new/icon-corazon.png"
                                                                       alt="Ícono de corazón"
                                                                       aria-hidden="true"/></a>
                    </div>
                </div>


            </div>
        </div>
        <!-- Termino barra de busqueda

        <div class="container d-md-none mt-2 pt-1 pb-0 navbar">
            <div class="boton-registrate-1 mx-auto w-100">
                <a class="nav-link registrate mx-auto" href="/mis-carpetas">MIS CARPETAS</a>
            </div>
        </div> -->


    </header>
</div>

