package backend.service;

import backend.dto.EducacionDTO;
import backend.exceptions.PortfolioException;
import backend.exceptions.ResourceNotFoundException;
import backend.model.Educacion;
import backend.model.Persona;
import backend.repository.EducacionRepository;
import backend.repository.PersonaRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class EducacionService implements IEducacionService{
    
    @Autowired
    private ModelMapper modelMapper;
    
    @Autowired
    private EducacionRepository eduRepo;
    
    @Autowired
    private PersonaRepository perRepo;
    
    @Override
    public EducacionDTO crearEducacion(Long personaID, EducacionDTO educacionDTO) {
        //convertimos de DTO a entidad
        Educacion educacion = this.mapearEntidad(educacionDTO);
        
        //buscamos la Persona
        Persona persona = this.perRepo.findById(personaID)
                .orElseThrow(()-> new ResourceNotFoundException("Persona","id",personaID));
        
        //asignamos a quien esta relacionado
        educacion.setEduPersona(persona);
        
        Educacion educacionNueva = this.eduRepo.save(educacion);
        
        //convertimos de entidad a DTO
        EducacionDTO educacionRespuesta = this.mapearDTO(educacionNueva);
                
        return educacionRespuesta;
    }

    @Override
    public List<EducacionDTO> verEducacionesPorPersona(Long personaID) {
        Persona per = this.perRepo.findById(personaID)
                .orElseThrow(()-> new ResourceNotFoundException("Persona","id",personaID));
        
        List<Educacion> educaciones =  per.getEducacionList();
        
        return educaciones.stream().map(educacion -> mapearDTO(educacion)).collect(Collectors.toList());
    }

    @Override
    public EducacionDTO buscarEducacion(Long personaID, Long EducacionID) {
        //buscamos la Persona
        Persona persona = this.perRepo.findById(personaID)
                .orElseThrow(()-> new ResourceNotFoundException("Persona","id",personaID));
        
        //buscamos la educacion en la persona
        Educacion educacion = this.eduRepo.findById(EducacionID)
                .orElseThrow(()-> new ResourceNotFoundException("Educacion","id",EducacionID));
        
        if(!educacion.getEduPersona().getId().equals(persona.getId())){
            throw new PortfolioException(HttpStatus.BAD_REQUEST,"La educacion no pertenece a la Persona.");
        }
        
        return mapearDTO(educacion);
    }

    @Override
    public EducacionDTO editarEducacion(Long personaID, Long educacionID, EducacionDTO educacion){
        //buscamos la Persona
        Persona persona = this.perRepo.findById(personaID)
                .orElseThrow(()-> new ResourceNotFoundException("Persona","id",personaID));
        
        //buscamos la educacion en la persona
        Educacion educacionEncontrada = this.eduRepo.findById(educacionID)
                .orElseThrow(()-> new ResourceNotFoundException("Educacion","id",educacionID));
        
        if(!educacionEncontrada.getEduPersona().getId().equals(persona.getId())){
            throw new PortfolioException(HttpStatus.BAD_REQUEST,"La educacion no pertenece a la Persona.");
        }
        
        educacionEncontrada.setInstituto(educacion.getInstituto());
        educacionEncontrada.setTitulo(educacion.getTitulo());
        educacionEncontrada.setFingreso(educacion.getFingreso());
        educacionEncontrada.setFegreso(educacion.getFegreso());

        Educacion educacionActualizada = this.eduRepo.save(educacionEncontrada);
        
        return mapearDTO(educacionActualizada);
    }

    @Override
    public void borrarEducacion(Long personaID, Long educacionID) {
        //buscamos la Persona
        Persona persona = this.perRepo.findById(personaID)
                .orElseThrow(()-> new ResourceNotFoundException("Persona","id",personaID));
        
        //buscamos la educacion en la persona
        Educacion educacionEncontrada = this.eduRepo.findById(educacionID)
                .orElseThrow(()-> new ResourceNotFoundException("Educacion","id",educacionID));
        
        if(!educacionEncontrada.getEduPersona().getId().equals(persona.getId())){
            throw new PortfolioException(HttpStatus.BAD_REQUEST,"La educacion no pertenece a la Persona.");
        }
        
        this.eduRepo.delete(educacionEncontrada);
    }
   
    //convierte entidad a DTO
    private EducacionDTO mapearDTO(Educacion educacion){
        EducacionDTO educacionNueva = this.modelMapper.map(educacion, EducacionDTO.class);
        
        return educacionNueva;
    }
    
    //convierte DTO a Entidad
    private Educacion mapearEntidad(EducacionDTO educacion){
        Educacion educacionNueva = this.modelMapper.map(educacion, Educacion.class);
        
        return educacionNueva;
    }

}
