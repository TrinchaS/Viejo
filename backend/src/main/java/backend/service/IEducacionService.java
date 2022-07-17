package backend.service;

import backend.dto.EducacionDTO;
import java.util.List;

public interface IEducacionService {
    
    public EducacionDTO crearEducacion(Long personaID, EducacionDTO educacionNueva);
    public List<EducacionDTO> verEducacionesPorPersona(Long personaID);
    public EducacionDTO buscarEducacion(Long personaID, Long EducacionID);
    public EducacionDTO editarEducacion(Long personaID, Long EducacionID, EducacionDTO educacion);
    public void borrarEducacion(Long personaID, Long EducacionID);
}
