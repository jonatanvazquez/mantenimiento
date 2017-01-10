var page= require('page');

var main = document.getElementById('main')

page('/maquinas',function(ctx,next){
	main.innerHTML = `   <div class="page-header">
      <h1 class="page-title">Maquinas</h1>
      <div class="page-header-actions">
        <form>
          <div class="input-search input-search-dark">
            <i class="input-search-icon md-search" aria-hidden="true"></i>
            <input type="text" class="form-control" name="" placeholder="Search...">
          </div>
        </form>
      </div>
    </div>
    <div class="page-content">
      <div class="projects-sort">
        <span class="projects-sort-label">Ordenar por: </span>
        <div class="inline-block dropdown">
          <span id="projects-menu" data-toggle="dropdown" aria-expanded="false" role="button">
            Elegir
            <i class="icon md-chevron-down" aria-hidden="true"></i>
          </span>
          <div class="dropdown-menu animation-scale-up animation-top-left animation-duration-250"
          aria-labelledby="projects-menu" role="menu">
            <a class="dropdown-item" href="javascript:void(0)" role="menuitem" tabindex="-1">Nombre</a>
            <a class="active dropdown-item" href="javascript:void(0)" role="menuitem" tabindex="-1">No. Piezas</a>
            <a class="dropdown-item" href="javascript:void(0)" role="menuitem" tabindex="-1">Prox. Mantenimiento</a>
          </div>
        </div>
      </div>
      <div class="projects-wrap">
        <ul class="blocks blocks-100 blocks-xxl-5 blocks-lg-4 blocks-md-3 blocks-sm-2"
        data-plugin="animateList" data-child=">li">
          <li>
            <div class="panel">
              <figure class="overlay overlay-hover animation-hover">
                <img class="caption-figure overlay-figure" src="/photos/cnc.jpg">
                <figcaption class="overlay-panel overlay-background overlay-fade text-xs-center vertical-align">
                  <div class="btn-group">
                    <div class="dropdown pull-xs-left">
                      <button type="button" class="btn btn-icon btn-pure btn-default" title="Setting"><i class="icon md-settings" aria-hidden="true"></i></button>
                      <div class="dropdown-menu" role="menu">
                        <a class="dropdown-item" href="">Copiar</a>
                        <a class="dropdown-item" href="">Renombrar</a>
                      </div>
                    </div>
                    <button type="button" class="btn btn-icon btn-pure btn-default" title="Eliminar"
                    data-tag="project-delete"><i class="icon md-delete" aria-hidden="true"></i></button>
                  </div>
                  <button type="button" class="btn btn-inverse project-button" onclick="window.open('/componentes', '_self')">Ver Componentes</button>
                </figcaption>
              </figure>
              <div class="time pull-xs-right">Feb 22, 2017</div>
              <div class="text-truncate">CP123KS</div>
            </div>
          </li>
          <li> 
            <div class="panel">
              <figure class="overlay overlay-hover animation-hover">
                <img class="caption-figure overlay-figure" src="/photos/cnc2.jpg">
                <figcaption class="overlay-panel overlay-background overlay-fade text-xs-center vertical-align">
                  <div class="btn-group">
                    <div class="dropdown pull-xs-left">
                      <button type="button" class="btn btn-icon btn-pure btn-default" title="Setting"><i class="icon md-settings" aria-hidden="true"></i></button>
                      <div class="dropdown-menu" role="menu">
                        <a class="dropdown-item" href="">Copiar</a>
                        <a class="dropdown-item" href="">Renombrar</a>
                      </div>
                    </div>
                    <button type="button" class="btn btn-icon btn-pure btn-default" title="Eliminar"
                    data-tag="project-delete"><i class="icon md-delete" aria-hidden="true"></i></button>
                  </div>
                  <button type="button" class="btn btn-inverse project-button">Ver Componentes</button>
                </figcaption>
              </figure>
              <div class="time pull-xs-right">Mar 10, 2017</div>
              <div class="text-truncate">XBVDG12</div>
            </div>
          </li>
          <li>
            <div class="panel">
              <figure class="overlay overlay-hover animation-hover">
                <img class="caption-figure overlay-figure" src="/photos/cnc3.jpg">
                <figcaption class="overlay-panel overlay-background overlay-fade text-xs-center vertical-align">
                  <div class="btn-group">
                    <div class="dropdown pull-xs-left">
                      <button type="button" class="btn btn-icon btn-pure btn-default" title="Setting"><i class="icon md-settings" aria-hidden="true"></i></button>
                      <div class="dropdown-menu" role="menu">
                        <a class="dropdown-item" href="">Copiar</a>
                        <a class="dropdown-item" href="">Renombrar</a>
                      </div>
                    </div>
                    <button type="button" class="btn btn-icon btn-pure btn-default" title="Eliminar"
                    data-tag="project-delete"><i class="icon md-delete" aria-hidden="true"></i></button>
                  </div>
                  <button type="button" class="btn btn-inverse project-button">Ver Componentes</button>
                </figcaption>
              </figure>
              <div class="time pull-xs-right">Mar 8, 2017</div>
              <div class="text-truncate">12JHJHD</div>
            </div>
          </li>
          <li>
            <div class="panel">
              <figure class="overlay overlay-hover animation-hover">
                <img class="caption-figure overlay-figure" src="/photos/torno.jpg">
                <figcaption class="overlay-panel overlay-background overlay-fade text-xs-center vertical-align">
                  <div class="btn-group">
                    <div class="dropdown pull-xs-left">
                      <button type="button" class="btn btn-icon btn-pure btn-default" title="Setting"><i class="icon md-settings" aria-hidden="true"></i></button>
                      <div class="dropdown-menu" role="menu">
                        <a class="dropdown-item" href="">Copiar</a>
                        <a class="dropdown-item" href="">Renombrar</a>
                      </div>
                    </div>
                    <button type="button" class="btn btn-icon btn-pure btn-default" title="Eliminar"
                    data-tag="project-delete"><i class="icon md-delete" aria-hidden="true"></i></button>
                  </div>
                  <button type="button" class="btn btn-inverse project-button">Ver Componentes</button>
                </figcaption>
              </figure>
              <div class="time pull-xs-right">June 22, 2017</div>
              <div class="text-truncate">12JHAK</div>
            </div>
          </li>
          <li>
            <div class="panel">
              <figure class="overlay overlay-hover animation-hover">
                <img class="caption-figure overlay-figure" src="/photos/cnc2.jpg">
                <figcaption class="overlay-panel overlay-background overlay-fade text-xs-center vertical-align">
                  <div class="btn-group">
                    <div class="dropdown pull-xs-left">
                      <button type="button" class="btn btn-icon btn-pure btn-default" title="Setting"><i class="icon md-settings" aria-hidden="true"></i></button>
                      <div class="dropdown-menu" role="menu">
                        <a class="dropdown-item" href="">Copiar</a>
                        <a class="dropdown-item" href="">Renombrar</a>
                      </div>
                    </div>
                    <button type="button" class="btn btn-icon btn-pure btn-default" title="Eliminar"
                    data-tag="project-delete"><i class="icon md-delete" aria-hidden="true"></i></button>
                  </div>
                  <button type="button" class="btn btn-inverse project-button">Ver Componentes</button>
                </figcaption>
              </figure>
              <div class="time pull-xs-right">Apr 30, 2017</div>
              <div class="text-truncate">AOII12</div>
            </div>
          </li>
          <li>
            <div class="panel">
              <figure class="overlay overlay-hover animation-hover">
                <img class="caption-figure overlay-figure" src="/photos/cnc.jpg">
                <figcaption class="overlay-panel overlay-background overlay-fade text-xs-center vertical-align">
                  <div class="btn-group">
                    <div class="dropdown pull-xs-left">
                      <button type="button" class="btn btn-icon btn-pure btn-default" title="Setting"><i class="icon md-settings" aria-hidden="true"></i></button>
                      <div class="dropdown-menu" role="menu">
                        <a class="dropdown-item" href="">Copiar</a>
                        <a class="dropdown-item" href="">Renombrar</a>
                      </div>
                    </div>
                    <button type="button" class="btn btn-icon btn-pure btn-default" title="Eliminar"
                    data-tag="project-delete"><i class="icon md-delete" aria-hidden="true"></i></button>
                  </div>
                  <button type="button" class="btn btn-inverse project-button">Ver Componentes</button>
                </figcaption>
              </figure>
              <div class="time pull-xs-right">May 12, 2017</div>
              <div class="text-truncate">QWOIOI23</div>
            </div>
          </li>
          <li>
            <div class="panel">
              <figure class="overlay overlay-hover animation-hover">
                <img class="caption-figure overlay-figure" src="/photos/torno.jpg">
                <figcaption class="overlay-panel overlay-background overlay-fade text-xs-center vertical-align">
                  <div class="btn-group">
                    <div class="dropdown pull-xs-left">
                      <button type="button" class="btn btn-icon btn-pure btn-default" title="Setting"><i class="icon md-settings" aria-hidden="true"></i></button>
                      <div class="dropdown-menu" role="menu">
                        <a class="dropdown-item" href="">Copiar</a>
                        <a class="dropdown-item" href="">Renombrar</a>
                      </div>
                    </div>
                    <button type="button" class="btn btn-icon btn-pure btn-default" title="Eliminar"
                    data-tag="project-delete"><i class="icon md-delete" aria-hidden="true"></i></button>
                  </div>
                  <button type="button" class="btn btn-inverse project-button">Ver Componentes</button>
                </figcaption>
              </figure>
              <div class="time pull-xs-right">May 25, 2017</div>
              <div class="text-truncate">POWQ124</div>
            </div>
          </li>
          <li>
            <div class="panel">
              <figure class="overlay overlay-hover animation-hover">
                <img class="caption-figure overlay-figure" src="/photos/cnc3.jpg">
                <figcaption class="overlay-panel overlay-background overlay-fade text-xs-center vertical-align">
                  <div class="btn-group">
                    <div class="dropdown pull-xs-left">
                      <button type="button" class="btn btn-icon btn-pure btn-default" title="Setting"><i class="icon md-settings" aria-hidden="true"></i></button>
                      <div class="dropdown-menu" role="menu">
                        <a class="dropdown-item" href="">Copiar</a>
                        <a class="dropdown-item" href="">Renombrar</a>
                      </div>
                    </div>
                    <button type="button" class="btn btn-icon btn-pure btn-default" title="Eliminar"
                    data-tag="project-delete"><i class="icon md-delete" aria-hidden="true"></i></button>
                  </div>
                  <button type="button" class="btn btn-inverse project-button">Ver Componentes</button>
                </figcaption>
              </figure>
              <div class="time pull-xs-right">Aug 30, 2017</div>
              <div class="text-truncate">WEK1230L</div>
            </div>
          </li>
          <li>
            <div class="panel">
              <figure class="overlay overlay-hover animation-hover">
                <img class="caption-figure overlay-figure" src="/photos/cnc2.jpg">
                <figcaption class="overlay-panel overlay-background overlay-fade text-xs-center vertical-align">
                  <div class="btn-group">
                    <div class="dropdown pull-xs-left">
                      <button type="button" class="btn btn-icon btn-pure btn-default" title="Setting"><i class="icon md-settings" aria-hidden="true"></i></button>
                      <div class="dropdown-menu" role="menu">
                        <a class="dropdown-item" href="">Copiar</a>
                        <a class="dropdown-item" href="">Renombrar</a>
                      </div>
                    </div>
                    <button type="button" class="btn btn-icon btn-pure btn-default" title="Eliminar"
                    data-tag="project-delete"><i class="icon md-delete" aria-hidden="true"></i></button>
                  </div>
                  <button type="button" class="btn btn-inverse project-button">Ver Componentes</button>
                </figcaption>
              </figure>
              <div class="time pull-xs-right">Oct 8, 2017</div>
              <div class="text-truncate">WWIE123</div>
            </div>
          </li>
          <li>
            <div class="panel">
              <figure class="overlay overlay-hover animation-hover">
                <img class="caption-figure overlay-figure" src="/photos/cnc.jpg">
                <figcaption class="overlay-panel overlay-background overlay-fade text-xs-center vertical-align">
                  <div class="btn-group">
                    <div class="dropdown pull-xs-left">
                      <button type="button" class="btn btn-icon btn-pure btn-default" title="Setting"><i class="icon md-settings" aria-hidden="true"></i></button>
                      <div class="dropdown-menu" role="menu">
                        <a class="dropdown-item" href="">Copiar</a>
                        <a class="dropdown-item" href="">Renombrar</a>
                      </div>
                    </div>
                    <button type="button" class="btn btn-icon btn-pure btn-default" title="Eliminar"
                    data-tag="project-delete"><i class="icon md-delete" aria-hidden="true"></i></button>
                  </div>
                  <button type="button" class="btn btn-inverse project-button">Ver Componentes</button>
                </figcaption>
              </figure>
              <div class="time pull-xs-right">Oct 18, 2017</div>
              <div class="text-truncate">DOWI12</div>
            </div>
          </li>
        </ul>
      </div>
      <nav>
        <ul class="pagination pagination-no-border">
          <li class="disabled page-item">
            <a class="page-link" href="javascript:void(0)" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="active page-item"><a class="page-link" href="javascript:void(0)">1 <span class="sr-only">(current)</span></a></li>
          <li class="page-item"><a class="page-link" href="javascript:void(0)">2</a></li>
          <li class="page-item"><a class="page-link" href="javascript:void(0)">3</a></li>
          <li class="page-item"><a class="page-link" href="javascript:void(0)">4</a></li>
          <li class="page-item"><a class="page-link" href="javascript:void(0)">5</a></li>
          <li class="page-item">
            <a class="page-link" href="javascript:void(0)" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>`;
})

page('/componentes',function(ctx,next){
	main.innerHTML = `    <div class="page-header">
      <h1 class="page-title">Componentes</h1>
      <div class="page-header-actions">
        <form>
          <div class="input-search input-search-dark">
            <i class="input-search-icon md-search" aria-hidden="true"></i>
            <input type="text" class="form-control" name="" placeholder="Search...">
          </div>
        </form>
      </div>
    </div>
    <div class="page-content">
      <div class="projects-sort">
        <span class="projects-sort-label">Ordenar por: </span>
        <div class="inline-block dropdown">
          <span id="projects-menu" data-toggle="dropdown" aria-expanded="false" role="button">
            Elegir
            <i class="icon md-chevron-down" aria-hidden="true"></i>
          </span>
          <div class="dropdown-menu animation-scale-up animation-top-left animation-duration-250"
          aria-labelledby="projects-menu" role="menu">
            <a class="dropdown-item" href="javascript:void(0)" role="menuitem" tabindex="-1">Alfabeticamente</a>
            <a class="active dropdown-item" href="javascript:void(0)" role="menuitem" tabindex="-1">Mayor cantidad de piezas</a>
            <a class="dropdown-item" href="javascript:void(0)" role="menuitem" tabindex="-1"></a>
          </div>
        </div>
      </div>
      <div class="projects-wrap">
        <ul class="blocks blocks-100 blocks-xxl-5 blocks-lg-4 blocks-md-3 blocks-sm-2"
        data-plugin="animateList" data-child=">li">
          <li>
            <div class="panel">
              <figure class="overlay overlay-hover animation-hover">
                <img class="caption-figure overlay-figure" src="/photos/compCNC1.jpg">
                <figcaption class="overlay-panel overlay-background overlay-fade text-xs-center vertical-align">
                  <div class="btn-group">
                    <div class="dropdown pull-xs-left">
                      <button type="button" class="btn btn-icon btn-pure btn-default" title="Setting"><i class="icon md-settings" aria-hidden="true"></i></button>
                      <div class="dropdown-menu" role="menu">
                        <a class="dropdown-item" href="">Copiar</a>
                        <a class="dropdown-item" href="">Renombrar</a>
                      </div>
                    </div>
                    <button type="button" class="btn btn-icon btn-pure btn-default" title="Eliminar"
                    data-tag="project-delete"><i class="icon md-delete" aria-hidden="true"></i></button>
                  </div>
                  <button type="button" class="btn btn-inverse project-button" onclick="window.open('/detalleComponente', '_self')">Detalles Componente</button>
                </figcaption>
              </figure>
              <div class="time pull-xs-right">Feb 22, 2017</div>
              <div class="text-truncate">LUJH123</div>
            </div>
          </li>
          <li> 
            <div class="panel">
              <figure class="overlay overlay-hover animation-hover">
                <img class="caption-figure overlay-figure" src="/photos/compCNC2.jpg">
                <figcaption class="overlay-panel overlay-background overlay-fade text-xs-center vertical-align">
                  <div class="btn-group">
                    <div class="dropdown pull-xs-left">
                      <button type="button" class="btn btn-icon btn-pure btn-default" title="Setting"><i class="icon md-settings" aria-hidden="true"></i></button>
                      <div class="dropdown-menu" role="menu">
                        <a class="dropdown-item" href="">Copiar</a>
                        <a class="dropdown-item" href="">Renombrar</a>
                      </div>
                    </div>
                    <button type="button" class="btn btn-icon btn-pure btn-default" title="Eliminar"
                    data-tag="project-delete"><i class="icon md-delete" aria-hidden="true"></i></button>
                  </div>
                  <button type="button" class="btn btn-inverse project-button" onclick="window.open('/detalleComponente', '_self')">Detalles Componente</button>
                </figcaption>
              </figure>
              <div class="time pull-xs-right">Mar 10, 2017</div>
              <div class="text-truncate">JHGT245</div>
            </div>
          </li>
          <li>
            <div class="panel">
              <figure class="overlay overlay-hover animation-hover">
                <img class="caption-figure overlay-figure" src="/photos/compCNC3.jpg">
                <figcaption class="overlay-panel overlay-background overlay-fade text-xs-center vertical-align">
                  <div class="btn-group">
                    <div class="dropdown pull-xs-left">
                      <button type="button" class="btn btn-icon btn-pure btn-default" title="Setting"><i class="icon md-settings" aria-hidden="true"></i></button>
                      <div class="dropdown-menu" role="menu">
                        <a class="dropdown-item" href="">Copiar</a>
                        <a class="dropdown-item" href="">Renombrar</a>
                      </div>
                    </div>
                    <button type="button" class="btn btn-icon btn-pure btn-default" title="Eliminar"
                    data-tag="project-delete"><i class="icon md-delete" aria-hidden="true"></i></button>
                  </div>
                  <button type="button" class="btn btn-inverse project-button" onclick="window.open('detallesComponente.html', '_self')">Detalles Componente</button>
                </figcaption>
              </figure>
              <div class="time pull-xs-right">Mar 8, 2017</div>
              <div class="text-truncate">QWER231</div>
            </div>
          </li>
          <li>
            <div class="panel">
              <figure class="overlay overlay-hover animation-hover">
                <img class="caption-figure overlay-figure" src="/photos/compCNC4.jpg">
                <figcaption class="overlay-panel overlay-background overlay-fade text-xs-center vertical-align">
                  <div class="btn-group">
                    <div class="dropdown pull-xs-left">
                      <button type="button" class="btn btn-icon btn-pure btn-default" title="Setting"><i class="icon md-settings" aria-hidden="true"></i></button>
                      <div class="dropdown-menu" role="menu">
                        <a class="dropdown-item" href="">Copiar</a>
                        <a class="dropdown-item" href="">Renombrar</a>
                      </div>
                    </div>
                    <button type="button" class="btn btn-icon btn-pure btn-default" title="Eliminar"
                    data-tag="project-delete"><i class="icon md-delete" aria-hidden="true"></i></button>
                  </div>
                  <button type="button" class="btn btn-inverse project-button" onclick="window.open('detallesComponente.html', '_self')">Detalles Componente</button>
                </figcaption>
              </figure>
              <div class="time pull-xs-right">June 22, 2017</div>
              <div class="text-truncate">CPJG327</div>
            </div>
          </li>
          <li>
            <div class="panel">
              <figure class="overlay overlay-hover animation-hover">
                <img class="caption-figure overlay-figure" src="/photos/compCNC5.jpg">
                <figcaption class="overlay-panel overlay-background overlay-fade text-xs-center vertical-align">
                  <div class="btn-group">
                    <div class="dropdown pull-xs-left">
                      <button type="button" class="btn btn-icon btn-pure btn-default" title="Setting"><i class="icon md-settings" aria-hidden="true"></i></button>
                      <div class="dropdown-menu" role="menu">
                        <a class="dropdown-item" href="">Copiar</a>
                        <a class="dropdown-item" href="">Renombrar</a>
                      </div>
                    </div>
                    <button type="button" class="btn btn-icon btn-pure btn-default" title="Eliminar"
                    data-tag="project-delete"><i class="icon md-delete" aria-hidden="true"></i></button>
                  </div>
                  <button type="button" class="btn btn-inverse project-button" onclick="window.open('detallesComponente.html', '_self')">Detalles Componente</button>
                </figcaption>
              </figure>
              <div class="time pull-xs-right">Apr 30, 2017</div>
              <div class="text-truncate">PLMF451</div>
            </div>
          </li>
          <li>
            <div class="panel">
              <figure class="overlay overlay-hover animation-hover">
                <img class="caption-figure overlay-figure" src="/photos/compCNC2.jpg">
                <figcaption class="overlay-panel overlay-background overlay-fade text-xs-center vertical-align">
                  <div class="btn-group">
                    <div class="dropdown pull-xs-left">
                      <button type="button" class="btn btn-icon btn-pure btn-default" title="Setting"><i class="icon md-settings" aria-hidden="true"></i></button>
                      <div class="dropdown-menu" role="menu">
                        <a class="dropdown-item" href="">Copiar</a>
                        <a class="dropdown-item" href="">Renombrar</a>
                      </div>
                    </div>
                    <button type="button" class="btn btn-icon btn-pure btn-default" title="Eliminar"
                    data-tag="project-delete"><i class="icon md-delete" aria-hidden="true"></i></button>
                  </div>
                  <button type="button" class="btn btn-inverse project-button" onclick="window.open('/detallesComponente', '_self')">Detalles Componente</button>
                </figcaption>
              </figure>
              <div class="time pull-xs-right">May 12, 2017</div>
              <div class="text-truncate">QWDF762</div>
            </div>
          </li>
          <li>
            <div class="panel">
              <figure class="overlay overlay-hover animation-hover">
                <img class="caption-figure overlay-figure" src="/photos/compCNC4.jpg">
                <figcaption class="overlay-panel overlay-background overlay-fade text-xs-center vertical-align">
                  <div class="btn-group">
                    <div class="dropdown pull-xs-left">
                      <button type="button" class="btn btn-icon btn-pure btn-default" title="Setting"><i class="icon md-settings" aria-hidden="true"></i></button>
                      <div class="dropdown-menu" role="menu">
                        <a class="dropdown-item" href="">Copiar</a>
                        <a class="dropdown-item" href="">Renombrar</a>
                      </div>
                    </div>
                    <button type="button" class="btn btn-icon btn-pure btn-default" title="Eliminar"
                    data-tag="project-delete"><i class="icon md-delete" aria-hidden="true"></i></button>
                  </div>
                  <button type="button" class="btn btn-inverse project-button" onclick="window.open('/detalleComponente', '_self')">Detalles Componente</button>
                </figcaption>
              </figure>
              <div class="time pull-xs-right">May 25, 2017</div>
              <div class="text-truncate">RTCN098</div>
            </div>
          </li>
          <li>
            <div class="panel">
              <figure class="overlay overlay-hover animation-hover">
                <img class="caption-figure overlay-figure" src="/photos/compCNC1.jpg">
                <figcaption class="overlay-panel overlay-background overlay-fade text-xs-center vertical-align">
                  <div class="btn-group">
                    <div class="dropdown pull-xs-left">
                      <button type="button" class="btn btn-icon btn-pure btn-default" title="Setting"><i class="icon md-settings" aria-hidden="true"></i></button>
                      <div class="dropdown-menu" role="menu">
                        <a class="dropdown-item" href="">Copiar</a>
                        <a class="dropdown-item" href="">Renombrar</a>
                      </div>
                    </div>
                    <button type="button" class="btn btn-icon btn-pure btn-default" title="Eliminar"
                    data-tag="project-delete"><i class="icon md-delete" aria-hidden="true"></i></button>
                  </div>
                  <button type="button" class="btn btn-inverse project-button" onclick="window.open('/detalleComponente', '_self')">Detalles Componente</button>
                </figcaption>
              </figure>
              <div class="time pull-xs-right">Aug 30, 2017</div>
              <div class="text-truncate">LMFS129</div>
            </div>
          </li>
          <li>
            <div class="panel">
              <figure class="overlay overlay-hover animation-hover">
                <img class="caption-figure overlay-figure" src="/photos/compCNC5.jpg">
                <figcaption class="overlay-panel overlay-background overlay-fade text-xs-center vertical-align">
                  <div class="btn-group">
                    <div class="dropdown pull-xs-left">
                      <button type="button" class="btn btn-icon btn-pure btn-default" title="Setting"><i class="icon md-settings" aria-hidden="true"></i></button>
                      <div class="dropdown-menu" role="menu">
                        <a class="dropdown-item" href="">Copiar</a>
                        <a class="dropdown-item" href="">Renombrar</a>
                      </div>
                    </div>
                    <button type="button" class="btn btn-icon btn-pure btn-default" title="Eliminar"
                    data-tag="project-delete"><i class="icon md-delete" aria-hidden="true"></i></button>
                  </div>
                  <button type="button" class="btn btn-inverse project-button" onclick="window.open('/detalleComponente', '_self')">Detalles Componente</button>
                </figcaption>
              </figure>
              <div class="time pull-xs-right">Oct 8, 2017</div>
              <div class="text-truncate">DWSD765</div>
            </div>
          </li>
          <li>
            <div class="panel">
              <figure class="overlay overlay-hover animation-hover">
                <img class="caption-figure overlay-figure" src="/photos/compCNC4.jpg">
                <figcaption class="overlay-panel overlay-background overlay-fade text-xs-center vertical-align">
                  <div class="btn-group">
                    <div class="dropdown pull-xs-left">
                      <button type="button" class="btn btn-icon btn-pure btn-default" title="Setting"><i class="icon md-settings" aria-hidden="true"></i></button>
                      <div class="dropdown-menu" role="menu">
                        <a class="dropdown-item" href="">Copiar</a>
                        <a class="dropdown-item" href="">Renombrar</a>
                      </div>
                    </div>
                    <button type="button" class="btn btn-icon btn-pure btn-default" title="Eliminar"
                    data-tag="project-delete"><i class="icon md-delete" aria-hidden="true"></i></button>
                  </div>
                  <button type="button" class="btn btn-inverse project-button" onclick="window.open('/detalleComponente', '_self')">Detalles Componente</button>
                </figcaption>
              </figure>
              <div class="time pull-xs-right">Oct 18, 2017</div>
              <div class="text-truncate">12HGDT</div>
            </div>
          </li>
        </ul>
      </div>
      <nav>
        <ul class="pagination pagination-no-border">
          <li class="disabled page-item">
            <a class="page-link" href="javascript:void(0)" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="active page-item"><a class="page-link" href="javascript:void(0)">1 <span class="sr-only">(current)</span></a></li>
          <li class="page-item"><a class="page-link" href="javascript:void(0)">2</a></li>
          <li class="page-item"><a class="page-link" href="javascript:void(0)">3</a></li>
          <li class="page-item"><a class="page-link" href="javascript:void(0)">4</a></li>
          <li class="page-item"><a class="page-link" href="javascript:void(0)">5</a></li>
          <li class="page-item">
            <a class="page-link" href="javascript:void(0)" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>`;
})
page();