package backend.service;

import backend.modelo.Habilidad;
import backend.repository.HabilidadRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HabilidadService implements IHabilidadService{
    @Autowired 
    private HabilidadRepository habRepo;

    @Override
    public List<Habilidad> verHabilidades() {
        return habRepo.findAll();
    }

    @Override
    public Habilidad buscarHabilidad(Long id) {
        return habRepo.findById(id).orElse(null);
    }

    @Override
    public void guardarHabilidad(Habilidad nueva) {
        habRepo.save(nueva);
    }

    @Override
    public void borrarHabilidad(Long id) {
        habRepo.deleteById(id);
    }
    
}
