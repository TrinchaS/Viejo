package backend.service;

import backend.dto.ExperienciaDTO;
import backend.exceptions.PortfolioException;
import backend.exceptions.ResourceNotFoundException;
import backend.model.Experiencia;
import backend.model.Persona;
import backend.repository.ExperienciaRepository;
import backend.repository.PersonaRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class ExperienciaService implements IExperienciaService{
    
    @Autowired
    private ModelMapper modelMapper;
    
    @Autowired
    private ExperienciaRepository expRepo;
    
    @Autowired
    private PersonaRepository perRepo;

    @Override
    public ExperienciaDTO crearExperiencia(Long personaID, ExperienciaDTO experienciaDTO) {
        //convertimos de DTO a entidad
        Experiencia experiencia = this.mapearEntidad(experienciaDTO);
        
        //buscamos la Persona
        Persona persona = this.perRepo.findById(personaID)
                .orElseThrow(()-> new ResourceNotFoundException("Persona","id",personaID));
        
        //asignamos a quien esta relacionado
        experiencia.setExpPersona(persona);
        
        Experiencia experienciaNueva = this.expRepo.save(experiencia);
        
        //convertimos de entidad a DTO
        ExperienciaDTO experienciaRespuesta = this.mapearDTO(experienciaNueva);
                
        return experienciaRespuesta;
    }

    @Override
    public List<ExperienciaDTO> verExperienciasPorPersona(Long personaID) {
        Persona per = this.perRepo.findById(personaID)
                .orElseThrow(()-> new ResourceNotFoundException("Persona","id",personaID));
        
        List<Experiencia> experiencias =  per.getExperienciaList();
        
        return experiencias.stream().map(experiencia -> mapearDTO(experiencia)).collect(Collectors.toList());
        
    }

    @Override
    public ExperienciaDTO buscarExperiencia(Long personaID, Long ExperienciaID) {
        //buscamos la Persona
        Persona persona = this.perRepo.findById(personaID)
                .orElseThrow(()-> new ResourceNotFoundException("Persona","id",personaID));
        
        //buscamos la experiencia en la persona
        Experiencia experiencia = this.expRepo.findById(ExperienciaID)
                .orElseThrow(()-> new ResourceNotFoundException("Experiencia","id",ExperienciaID));
        
        if(!experiencia.getExpPersona().getId().equals(persona.getId())){
            throw new PortfolioException(HttpStatus.BAD_REQUEST,"La experiencia no pertenece a la Persona.");
        }
        
        return mapearDTO(experiencia);
    }

    @Override
    public ExperienciaDTO editarExperiencia(Long personaID, Long experienciaID, ExperienciaDTO experiencia) {
        //buscamos la Persona
        Persona persona = this.perRepo.findById(personaID)
                .orElseThrow(()-> new ResourceNotFoundException("Persona","id",personaID));
        
        //buscamos la educacion en la persona
        Experiencia experienciaEncontrada = this.expRepo.findById(experienciaID)
                .orElseThrow(()-> new ResourceNotFoundException("Experiencia","id",experienciaID));
        
        if(!experienciaEncontrada.getExpPersona().getId().equals(persona.getId())){
            throw new PortfolioException(HttpStatus.BAD_REQUEST,"La experiencia no pertenece a la Persona.");
        }
        
        experienciaEncontrada.setPuesto(experiencia.getPuesto());
        experienciaEncontrada.setEmpresa(experiencia.getEmpresa());
        experienciaEncontrada.setJornada(experiencia.getJornada());
        experienciaEncontrada.setFingreso(experiencia.getFingreso());
        experienciaEncontrada.setFegreso(experiencia.getFegreso());
        experienciaEncontrada.setUbicacion(experiencia.getUbicacion());
        experienciaEncontrada.setPais(experiencia.getPais());
        experienciaEncontrada.setDescripcion(experiencia.getDescripcion());

        Experiencia experienciaActualizada = this.expRepo.save(experienciaEncontrada);
        
        return mapearDTO(experienciaActualizada);
    }

    @Override
    public void borrarExperiencia(Long personaID, Long experienciaID) {
        //buscamos la Persona
        Persona persona = this.perRepo.findById(personaID)
                .orElseThrow(()-> new ResourceNotFoundException("Persona","id",personaID));
        
        //buscamos la educacion en la persona
        Experiencia experienciaEncontrada = this.expRepo.findById(experienciaID)
                .orElseThrow(()-> new ResourceNotFoundException("Experiencia","id",experienciaID));
        
        if(!experienciaEncontrada.getExpPersona().getId().equals(persona.getId())){
            throw new PortfolioException(HttpStatus.BAD_REQUEST,"La experiencia no pertenece a la Persona.");
        }
        
        this.expRepo.delete(experienciaEncontrada);
    }
   
    //convierte entidad a DTO
    private ExperienciaDTO mapearDTO(Experiencia experiencia){
        ExperienciaDTO experienciaNueva = this.modelMapper.map(experiencia, ExperienciaDTO.class);
        
        return experienciaNueva;
    }
    
    //convierte DTO a Entidad
    private Experiencia mapearEntidad(ExperienciaDTO experiencia){
        Experiencia experienciaNueva = this.modelMapper.map(experiencia, Experiencia.class);
        
        return experienciaNueva;
    }
        
}
