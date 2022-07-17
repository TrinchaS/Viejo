package backend.service;

import backend.dto.ProyectoDTO;
import backend.exceptions.PortfolioException;
import backend.exceptions.ResourceNotFoundException;
import backend.model.Persona;
import backend.model.Proyecto;
import backend.repository.PersonaRepository;
import backend.repository.ProyectoRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ProyectoService implements IProyectoService{
    
    @Autowired
    private ModelMapper modelMapper;
    
    @Autowired
    private ProyectoRepository proRepo;
    
    @Autowired
    private PersonaRepository perRepo;

    @Override
    public ProyectoDTO crearProyecto(Long personaID, ProyectoDTO proyectoDTO) {
        //convertimos de DTO a entidad
        Proyecto proyecto = this.mapearEntidad(proyectoDTO);
        
        //buscamos la Persona
        Persona persona = this.perRepo.findById(personaID)
                .orElseThrow(()-> new ResourceNotFoundException("Persona","id",personaID));
        
        //asignamos a quien esta relacionado
        proyecto.setProPersona(persona);
        
        Proyecto proyectoNueva = this.proRepo.save(proyecto);
        
        //convertimos de entidad a DTO
        ProyectoDTO proyectoRespuesta = this.mapearDTO(proyectoNueva);
                
        return proyectoRespuesta;
    }

    @Override
    public List<ProyectoDTO> verProyectosPorPersona(Long personaID) {
        Persona per = this.perRepo.findById(personaID)
                .orElseThrow(()-> new ResourceNotFoundException("Persona","id",personaID));
        
        List<Proyecto> proyectos =  per.getProyectoList();
        
        return proyectos.stream().map(proyecto -> mapearDTO(proyecto)).collect(Collectors.toList());
        
    }

    @Override
    public ProyectoDTO buscarProyecto(Long personaID, Long ProyectoID) {
        //buscamos la Persona
        Persona persona = this.perRepo.findById(personaID)
                .orElseThrow(()-> new ResourceNotFoundException("Persona","id",personaID));
        
        //buscamos la proyecto en la persona
        Proyecto proyecto = this.proRepo.findById(ProyectoID)
                .orElseThrow(()-> new ResourceNotFoundException("Proyecto","id",ProyectoID));
        
        if(!proyecto.getProPersona().getId().equals(persona.getId())){
            throw new PortfolioException(HttpStatus.BAD_REQUEST,"El proyecto no pertenece a la Persona.");
        }
        
        return mapearDTO(proyecto);
    }

    @Override
    public ProyectoDTO editarProyecto(Long personaID, Long proyectoID, ProyectoDTO proyecto) {
        //buscamos la Persona
        Persona persona = this.perRepo.findById(personaID)
                .orElseThrow(()-> new ResourceNotFoundException("Persona","id",personaID));
        
        //buscamos la educacion en la persona
        Proyecto proyectoEncontrado = this.proRepo.findById(proyectoID)
                .orElseThrow(()-> new ResourceNotFoundException("Proyecto","id",proyectoID));
        
        if(!proyectoEncontrado.getProPersona().getId().equals(persona.getId())){
            throw new PortfolioException(HttpStatus.BAD_REQUEST,"El proyecto no pertenece a la Persona.");
        }
        
        proyectoEncontrado.setNombre(proyecto.getNombre());
        proyectoEncontrado.setUrl(proyecto.getUrl());
        proyectoEncontrado.setDescripcion(proyecto.getDescripcion());

        Proyecto proyectoActualizada = this.proRepo.save(proyectoEncontrado);
        
        return mapearDTO(proyectoActualizada);
    }

    @Override
    public void borrarProyecto(Long personaID, Long proyectoID) {
        //buscamos la Persona
        Persona persona = this.perRepo.findById(personaID)
                .orElseThrow(()-> new ResourceNotFoundException("Persona","id",personaID));
        
        //buscamos la educacion en la persona
        Proyecto proyectoEncontrado = this.proRepo.findById(proyectoID)
                .orElseThrow(()-> new ResourceNotFoundException("Proyecto","id",proyectoID));
        
        if(!proyectoEncontrado.getProPersona().getId().equals(persona.getId())){
            throw new PortfolioException(HttpStatus.BAD_REQUEST,"El proyecto no pertenece a la Persona.");
        }
        
        this.proRepo.delete(proyectoEncontrado);
    }
   
    //convierte entidad a DTO
    private ProyectoDTO mapearDTO(Proyecto proyecto){
        ProyectoDTO proyectoNueva = this.modelMapper.map(proyecto, ProyectoDTO.class);
        
        return proyectoNueva;
    }
    
    //convierte DTO a Entidad
    private Proyecto mapearEntidad(ProyectoDTO proyecto){
        Proyecto proyectoNueva = this.modelMapper.map(proyecto, Proyecto.class);
        
        return proyectoNueva;
    }
}
