package backend.service;

import backend.modelo.Persona;
import backend.repository.PersonaRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PersonaService implements IPersonaService{
    
    private final PersonaRepository perRepo;
    
    @Autowired
    public PersonaService(PersonaRepository perRepo){
        this.perRepo = perRepo;
    }
    
    @Override
    public List<Persona> verPersonas() {
        return perRepo.findAll();
    }

    @Override
    public Persona buscarPersona(Long id) {
        return perRepo.findById(id).orElse(null);
    }

    @Override
    public Persona guardarPersona(Persona nueva) {
        return perRepo.save(nueva);
    }

    @Override
    public void borrarPersona(Long id) {
        perRepo.deleteById(id);
    }
    
}
