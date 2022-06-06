package backend.service;

import backend.modelo.Proyecto;
import backend.repository.ProyectoRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProyectoService implements IProyectoService{
    @Autowired
    private ProyectoRepository proRepo;

    @Override
    public List<Proyecto> verProyectos() {
        return proRepo.findAll();
    }

    @Override
    public Proyecto buscarProyecto(Long id) {
        return proRepo.findById(id).orElse(null);
    }

    @Override
    public void guardarProyecto(Proyecto nueva) {
        proRepo.save(nueva);
    }

    @Override
    public void borrarProyecto(Long id) {
        proRepo.deleteById(id);
    }
    
}
