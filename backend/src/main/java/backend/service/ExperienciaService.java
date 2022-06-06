package backend.service;

import backend.modelo.Experiencia;
import backend.repository.ExperienciaRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExperienciaService implements IExperienciaService{
    @Autowired
    ExperienciaRepository expRepo;

    @Override
    public List<Experiencia> verExperiencias() {
        return expRepo.findAll();
    }

    @Override
    public Experiencia buscarExperiencia(Long id) {
        return expRepo.findById(id).orElse(null);
    }

    @Override
    public void guardarExperiencia(Experiencia nueva) {
        expRepo.save(nueva);
    }

    @Override
    public void borrarExperiencia(Long id) {
        expRepo.deleteById(id);
    }
    
}
