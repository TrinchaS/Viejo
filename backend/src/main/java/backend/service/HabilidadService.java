package backend.service;

import backend.modelo.Habilidad;
import backend.repository.HabilidadRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class HabilidadService implements IHabilidadService{
        
    private final HabilidadRepository habRepo;
    
    @Autowired
    public HabilidadService(HabilidadRepository habRepo){
        this.habRepo = habRepo;
    }

    @Override
    public List<Habilidad> verHabilidades() {
        return habRepo.findAll();
    }

    @Override
    public Habilidad buscarHabilidad(Long id) {
        return habRepo.findById(id).orElse(null);
    }

    @Override
    public Habilidad guardarHabilidad(Habilidad nueva) {
        return habRepo.save(nueva);
    }

    @Override
    public void borrarHabilidad(Long id) {
        habRepo.deleteById(id);
    }
    
}
