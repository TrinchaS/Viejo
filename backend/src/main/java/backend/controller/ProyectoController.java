package backend.controller;

import backend.modelo.Proyecto;
import backend.service.ProyectoService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class ProyectoController {
    
    @Autowired
    private ProyectoService proService;
    
    @GetMapping("/verProyectos")
    public List<Proyecto> verProyectos(){
        return proService.verProyectos();
    }
    
    @PostMapping("/creaProyecto")
    public String crearProyecto(@RequestBody Proyecto nuevo){
        proService.guardarProyecto(nuevo);
        return "Proyecto creado.";
    }
    
    @GetMapping("/buscaProyecto/{id}")
    public Proyecto buscaProyecto(@PathVariable Long id){
        return proService.buscarProyecto(id);
    }
    
    @PutMapping("/editaProyecto")
    public String guardarProyecto(@PathVariable Long id,
                             @RequestParam("nombre") String nuevoNombre,
                             @RequestParam("url") String nuevaURL,
                             @RequestParam("descripcion") String nuevaDescripcion){
        Proyecto nuevo = proService.buscarProyecto(id);
        nuevo.setNombre(nuevoNombre);
        nuevo.setUrl(nuevaURL);
        nuevo.setDescripcion(nuevaDescripcion);
        proService.guardarProyecto(nuevo);
        return "Proyecto editado.";
    }
    
    @DeleteMapping("/borrarProyecto/{id}")
    public String borrarProyecto(@PathVariable Long id){
        proService.borrarProyecto(id);
        return "Proyecto borrado.";
    }
}
