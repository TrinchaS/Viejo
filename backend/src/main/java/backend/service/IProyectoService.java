package backend.service;

import backend.modelo.Proyecto;
import java.util.List;

public interface IProyectoService {
    public List<Proyecto> verProyectos();
    public Proyecto buscarProyecto(Long id);
    public Proyecto guardarProyecto(Proyecto nueva);
    public void borrarProyecto(Long id);
}
