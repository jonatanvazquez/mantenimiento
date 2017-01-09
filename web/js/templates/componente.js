var yo = require('yo-yo');
 

function getPanelMaterial(){
	return yo `<li>
            <div class="panel">
              <figure class="overlay overlay-hover animation-hover">
                <img class="caption-figure overlay-figure" src="../../../global/photos/compCNC1.jpg">
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
              <div class="time pull-xs-right">Feb 22, 2017</div>
              <div class="text-truncate">LUJH123</div>
            </div>
          </li>`;
}

modules.export.menu = getPanelMaterial;