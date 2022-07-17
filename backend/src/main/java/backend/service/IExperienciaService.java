package backend.service;

import backend.dto.ExperienciaDTO;
import java.util.List;

public interface IExperienciaService {
    public ExperienciaDTO crearExperiencia(Long personaID, ExperienciaDTO experienciaNueva);
    public List<ExperienciaDTO> verExperienciasPorPersona(Long personaID);
    public ExperienciaDTO buscarExperiencia(Long personaID, Long ExperienciaID);
    public ExperienciaDTO editarExperiencia(Long personaID, Long experienciaID, ExperienciaDTO experiencia);
    public void borrarExperiencia(Long personaID, Long experienciaID);    
}
