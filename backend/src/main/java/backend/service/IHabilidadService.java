package backend.service;

import backend.dto.HabilidadDTO;
import java.util.List;

public interface IHabilidadService {
    public HabilidadDTO crearHabilidad (Long personaID, HabilidadDTO habilidadDTO);
    public List<HabilidadDTO> verHabilidadesPorPersona(Long personaID);
    public HabilidadDTO buscarHabilidad(Long personaID, Long HabilidadID);
    public HabilidadDTO editarHabilidad(Long personaID, Long habilidadID, HabilidadDTO habilidad);
    public void borrarHabilidad(Long personaID, Long habilidadID);
}
