package backend.service;

import backend.dto.HabilidadDTO;
import backend.exceptions.PortfolioException;
import backend.exceptions.ResourceNotFoundException;
import backend.model.Habilidad;
import backend.model.Persona;
import backend.repository.HabilidadRepository;
import backend.repository.PersonaRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class HabilidadService implements IHabilidadService{
    
    @Autowired
    private ModelMapper modelMapper;
    
    @Autowired
    private HabilidadRepository habRepo;
    
    @Autowired
    private PersonaRepository perRepo;

    @Override
    public HabilidadDTO crearHabilidad(Long personaID, HabilidadDTO habilidadDTO) {
        //convertimos de DTO a entidad
        Habilidad habilidad = this.mapearEntidad(habilidadDTO);
        
        //buscamos la Persona
        Persona persona = this.perRepo.findById(personaID)
                .orElseThrow(()-> new ResourceNotFoundException("Persona","id",personaID));
        
        //asignamos a quien esta relacionado
        habilidad.setHabPersona(persona);
        
        Habilidad habilidadNueva = this.habRepo.save(habilidad);
        
        //convertimos de entidad a DTO
        HabilidadDTO habilidadRespuesta = this.mapearDTO(habilidadNueva);
                
        return habilidadRespuesta;
    }

    @Override
    public List<HabilidadDTO> verHabilidadesPorPersona(Long personaID) {
        Persona per = this.perRepo.findById(personaID)
                .orElseThrow(()-> new ResourceNotFoundException("Persona","id",personaID));
        
        List<Habilidad> habilidades =  per.getHabilidadList();
        
        return habilidades.stream().map(habilidad -> mapearDTO(habilidad)).collect(Collectors.toList());
        
    }

    @Override
    public HabilidadDTO buscarHabilidad(Long personaID, Long HabilidadID) {
        //buscamos la Persona
        Persona persona = this.perRepo.findById(personaID)
                .orElseThrow(()-> new ResourceNotFoundException("Persona","id",personaID));
        
        //buscamos la habilidad en la persona
        Habilidad habilidad = this.habRepo.findById(HabilidadID)
                .orElseThrow(()-> new ResourceNotFoundException("Habilidad","id",HabilidadID));
        
        if(!habilidad.getHabPersona().getId().equals(persona.getId())){
            throw new PortfolioException(HttpStatus.BAD_REQUEST,"La habilidad no pertenece a la Persona.");
        }
        
        return mapearDTO(habilidad);
    }

    @Override
    public HabilidadDTO editarHabilidad(Long personaID, Long habilidadID, HabilidadDTO habilidad) {
        //buscamos la Persona
        Persona persona = this.perRepo.findById(personaID)
                .orElseThrow(()-> new ResourceNotFoundException("Persona","id",personaID));
        
        //buscamos la educacion en la persona
        Habilidad habilidadEncontrada = this.habRepo.findById(habilidadID)
                .orElseThrow(()-> new ResourceNotFoundException("Habilidad","id",habilidadID));
        
        if(!habilidadEncontrada.getHabPersona().getId().equals(persona.getId())){
            throw new PortfolioException(HttpStatus.BAD_REQUEST,"La habilidad no pertenece a la Persona.");
        }
        
        habilidadEncontrada.setNombre(habilidad.getNombre());
        habilidadEncontrada.setPorcentaje(habilidad.getPorcentaje());

        Habilidad habilidadActualizada = this.habRepo.save(habilidadEncontrada);
        
        return mapearDTO(habilidadActualizada);
    }

    @Override
    public void borrarHabilidad(Long personaID, Long habilidadID) {
        //buscamos la Persona
        Persona persona = this.perRepo.findById(personaID)
                .orElseThrow(()-> new ResourceNotFoundException("Persona","id",personaID));
        
        //buscamos la educacion en la persona
        Habilidad habilidadEncontrada = this.habRepo.findById(habilidadID)
                .orElseThrow(()-> new ResourceNotFoundException("Habilidad","id",habilidadID));
        
        if(!habilidadEncontrada.getHabPersona().getId().equals(persona.getId())){
            throw new PortfolioException(HttpStatus.BAD_REQUEST,"La habilidad no pertenece a la Persona.");
        }
        
        this.habRepo.delete(habilidadEncontrada);
    }
   
    //convierte entidad a DTO
    private HabilidadDTO mapearDTO(Habilidad habilidad){
        HabilidadDTO habilidadNueva = this.modelMapper.map(habilidad, HabilidadDTO.class);
        
        return habilidadNueva;
    }
    
    //convierte DTO a Entidad
    private Habilidad mapearEntidad(HabilidadDTO habilidad){
        Habilidad habilidadNueva = this.modelMapper.map(habilidad, Habilidad.class);
        
        return habilidadNueva;
    }
}