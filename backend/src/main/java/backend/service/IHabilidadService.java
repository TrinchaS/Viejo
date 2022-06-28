package backend.service;

import backend.modelo.Habilidad;
import java.util.List;

public interface IHabilidadService {
    public List<Habilidad> verHabilidades();
    public Habilidad buscarHabilidad(Long id);
    public Habilidad guardarHabilidad(Habilidad nueva);
    public void borrarHabilidad(Long id);
}
