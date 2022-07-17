package backend.service;

import backend.dto.PersonaDTO;
import backend.exceptions.ResourceNotFoundException;
import backend.model.Persona;
import backend.repository.PersonaRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonaService implements IPersonaService{
    
    @Autowired
    private ModelMapper modelMapper;
    
    @Autowired
    private PersonaRepository perRepo;

    @Override
    public PersonaDTO crearPersona(PersonaDTO personaDto) {
        //convertimos de DTO a entidad
        Persona persona = this.mapearEntidad(personaDto);
        
        Persona personaNueva = this.perRepo.save(persona);
        
        //convertimos de entidad a DTO
        PersonaDTO personaRespuesta = this.mapearDTO(personaNueva);
                
        return personaRespuesta;
    }

    @Override
    public List<PersonaDTO> verPersonas() {
        List<Persona> personas = this.perRepo.findAll();
        
        return personas.stream().map(persona -> mapearDTO(persona)).collect(Collectors.toList());
    }

    @Override
    public PersonaDTO buscarPersona(Long id) {
        Persona persona = this.perRepo
                .findById(id).orElseThrow(()-> new ResourceNotFoundException("Persona","id",id));
        
        return mapearDTO(persona);
    }

    @Override
    public PersonaDTO editarPersona(PersonaDTO persona, Long id) {
        Persona personaEncontrada = this.perRepo
                .findById(id).orElseThrow(()-> new ResourceNotFoundException("Persona","id",id));
        
        personaEncontrada.setNombre(persona.getNombre());
        personaEncontrada.setApellido(persona.getApellido());
        personaEncontrada.setTituloNivel(persona.getTituloNivel());
        personaEncontrada.setFnacimiento(persona.getFnacimiento());
        personaEncontrada.setRecide(persona.getRecide());
        personaEncontrada.setEmail(persona.getEmail());
        personaEncontrada.setWhatsapp(persona.getWhatsapp());
        personaEncontrada.setFacebook(persona.getFacebook());
        personaEncontrada.setFotoURL(persona.getFotoURL());
        personaEncontrada.setLogoURL(persona.getLogoURL());
        personaEncontrada.setAcerca(persona.getAcerca());
        
        Persona personaActualizada = this.perRepo.save(personaEncontrada);
        
        return mapearDTO(personaActualizada);
    }

    @Override
    public void borrarPersona(Long id) {
        Persona personaEncontrada = this.perRepo
                .findById(id).orElseThrow(()-> new ResourceNotFoundException("Persona","id",id));
        this.perRepo.delete(personaEncontrada);
        
    }
   
    //convierte entidad a DTO
    private PersonaDTO mapearDTO(Persona persona){
        PersonaDTO personaNueva = this.modelMapper.map(persona, PersonaDTO.class);
        
        return personaNueva;
    }
    
    //convierte DTO a Entidad
    private Persona mapearEntidad(PersonaDTO persona){
        Persona personaNueva = this.modelMapper.map(persona, Persona.class);
        
        return personaNueva;
    }
    
}
