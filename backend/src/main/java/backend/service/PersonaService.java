package backend.service;

import backend.modelo.Persona;
import backend.repository.PersonaRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonaService implements IPersonaService{
    @Autowired
    private PersonaRepository perRepo;
    
    @Override
    public List<Persona> verPersonas() {
        return perRepo.findAll();
    }

    @Override
    public Persona buscarPersona(Long id) {
        return perRepo.findById(id).orElse(null);
    }

    @Override
    public void guardarPersona(Persona nueva) {
        perRepo.save(nueva);
    }

    @Override
    public void borrarPersona(Long id) {
        perRepo.deleteById(id);
    }
    
}
