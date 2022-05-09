<div class="container-fluid">
    <div class="contacto" id="contacto">
        <div class="container">
            <div class="row justify-content-end">
                <div class="col parte-1">
                    <div class="titulos-contacto">
                        <h2>Contáctanos</h2>
                        <!--
                        <p><a class="text-white text-decoration-none" href="mailto:contacto@scart.cl">contacto@scart.cl</a></p>
                        -->
                        <hr>
                        <img class="logo-scart mb-4 mb-xl-5" loading="eager"
                             src="/view/assets/img/new/logo-blanco.svg" alt="Logo de Scart">
                        <div class="d-flex redes">
                            <a href="https://www.facebook.com/Scart-248824297012631" target="_blank">
                                <img src="/view/assets/img/new/redes-03.svg" loading="eager"
                                     alt="Logo de Facebook">
                            </a>
                            <a href="https://www.instagram.com/scart.cl/?hl=es" target="_blank">
                                <img src="/view/assets/img/new/redes-01.svg" loading="eager"
                                     alt="Logo de Instagram">
                            </a>
                            <a href="https://twitter.com/SCARTcl" target="_blank">
                                <img src="/view/assets/img/new/redes-02.svg" loading="eager"
                                     alt="Logo de Twitter">
                            </a>
                        </div>
                    </div>
                </div>
                <div class="col parte-2">
                    <form method="post" class="formulario">
                        <input type="hidden" name="action" value="contact_scart">
                        <p>¿Tienes alguna consulta o sugerencia para nosotros? Déjanos tu mensaje y nos
                            pondremos en contacto.</p>
                        <div class="row gy-4">
                            <div class="form-group col-12 col-lg-6">
                                <input type="text" class="form-control" name="contact_name"
                                       id="contact_name" placeholder="Nombre" required/>
                            </div>

                            <div class="form-group col-12 col-lg-6">
                                <input type="email" class="form-control" name="contact_mailbox"
                                       id="contact_mailbox" placeholder="Email" required/>
                            </div>
                            <div class="form-group col-12">
                                <input type="text" class="form-control" name="contact_subject"
                                       id="contact_subject" placeholder="Asunto" required/>
                            </div>

                            <div class="form-group col-12">
                                            <textarea cols="5" class="form-control" name="contact_message"
                                                      id="contact_message" placeholder="Mensaje" required></textarea>
                            </div>
                        </div>
                        <div class="boton">
                            <input type="submit" name="submit" class="btn" value="Enviar mensaje">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>