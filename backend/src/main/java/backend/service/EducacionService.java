package backend.service;

import backend.modelo.Educacion;
import backend.repository.EducacionRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EducacionService implements IEducacionService{
    @Autowired
    private EducacionRepository eduRepo;
    
    @Override
    public List<Educacion> verEducaciones() {
        return eduRepo.findAll();
    }

    @Override
    public Educacion buscarEducacion(Long id) {
        return eduRepo.findById(id).orElse(null);
    }

    @Override
    public void guardarEducacion(Educacion nueva) {
        eduRepo.save(nueva);
    }

    @Override
    public void borrarEducacion(Long id) {
        eduRepo.deleteById(id);
    }
    
}
