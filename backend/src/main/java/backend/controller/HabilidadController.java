package backend.controller;

import backend.modelo.Habilidad;
import backend.service.HabilidadService;
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
public class HabilidadController {
    
    @Autowired
    private HabilidadService habService;
    
    @GetMapping("/verHabilidades")
    public List<Habilidad> verHabilidades(){
        return habService.verHabilidades();
    }
    
    @PostMapping("/creaHabilidad")
    public String crearHabilidad(@RequestBody Habilidad nueva){
        habService.guardarHabilidad(nueva);
        return "La Habilidad fue creada.";
    }
    
    @GetMapping("/buscaHabilidad/{id}")
    public Habilidad buscaHabilidad(@PathVariable Long id){
        return habService.buscarHabilidad(id);
    }
    
    @PutMapping("/editaHabilidad")
    public String editaHabilidad(@PathVariable Long id,
                             @RequestParam("nombre") String nuevoNombre,
                             @RequestParam("porcentaje") String nuevoPorcentaje){          
        Habilidad nueva = habService.buscarHabilidad(id);
        nueva.setNombre(nuevoNombre);
        nueva.setPorcentaje(nuevoPorcentaje);
        habService.guardarHabilidad(nueva);
        return "La Habilidad fue editada";
    }
    
    @DeleteMapping("/borrarHabilidad/{id}")
    public String borrarHabilidad(@PathVariable Long id){
        habService.borrarHabilidad(id);
        return "La Habilidad fue borrada.";
    }
}
