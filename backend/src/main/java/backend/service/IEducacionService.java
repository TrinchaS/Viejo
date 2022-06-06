package backend.service;

import backend.modelo.Educacion;
import java.util.List;

public interface IEducacionService {
    public List<Educacion> verEducaciones();
    public Educacion buscarEducacion(Long id);
    public void guardarEducacion(Educacion nueva);
    public void borrarEducacion(Long id);
}
