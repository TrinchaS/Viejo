package backend.service;

import backend.dto.ProyectoDTO;
import java.util.List;

public interface IProyectoService {
    public ProyectoDTO crearProyecto (Long personaID, ProyectoDTO proyectoDTO);
    public List<ProyectoDTO> verProyectosPorPersona(Long personaID);
    public ProyectoDTO buscarProyecto(Long personaID, Long ProyectoID);
    public ProyectoDTO editarProyecto(Long personaID, Long proyectoID, ProyectoDTO proyecto);
    public void borrarProyecto(Long personaID, Long proyectoID);
}
