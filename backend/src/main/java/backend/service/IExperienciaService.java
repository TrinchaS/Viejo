package backend.service;

import backend.modelo.Experiencia;
import java.util.List;

public interface IExperienciaService {
    public List<Experiencia> verExperiencias();
    public Experiencia buscarExperiencia(Long id);
    public Experiencia guardarExperiencia(Experiencia nueva);
    public void borrarExperiencia(Long id);    
}
