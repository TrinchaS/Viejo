package backend.service;

import backend.modelo.Persona;
import java.util.List;

public interface IPersonaService {
    public List<Persona> verPersonas();
    public Persona buscarPersona(Long id);
    public Persona guardarPersona(Persona nueva);
    public void borrarPersona(Long id);
}
