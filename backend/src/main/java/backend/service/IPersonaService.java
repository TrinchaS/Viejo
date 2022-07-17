package backend.service;

import backend.dto.PersonaDTO;
import java.util.List;

public interface IPersonaService {
    public PersonaDTO crearPersona(PersonaDTO personaNueva);
    public List<PersonaDTO> verPersonas();
    public PersonaDTO buscarPersona(Long id);
    public PersonaDTO editarPersona(PersonaDTO persona, Long id);
    public void borrarPersona(Long id);
}
