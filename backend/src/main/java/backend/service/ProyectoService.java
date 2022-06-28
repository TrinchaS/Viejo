package backend.service;

import backend.modelo.Proyecto;
import backend.repository.ProyectoRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ProyectoService implements IProyectoService{
    
    private final ProyectoRepository proRepo;

    @Autowired
    public ProyectoService(ProyectoRepository proRepo){
        this.proRepo = proRepo;
    }
            
    @Override
    public List<Proyecto> verProyectos() {
        return proRepo.findAll();
    }

    @Override
    public Proyecto buscarProyecto(Long id) {
        return proRepo.findById(id).orElse(null);
    }

    @Override
    public Proyecto guardarProyecto(Proyecto nueva) {
        return proRepo.save(nueva);
    }

    @Override
    public void borrarProyecto(Long id) {
        proRepo.deleteById(id);
    }
    
}
