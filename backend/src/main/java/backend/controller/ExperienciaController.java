package backend.controller;

import backend.modelo.Experiencia;
import backend.service.ExperienciaService;
import java.time.LocalDate;
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
public class ExperienciaController {
    
    @Autowired
    private ExperienciaService expService;
    
    @GetMapping("/verExperiencias")
    public List<Experiencia> verExperiencias(){
        return expService.verExperiencias();
    }
    
    @PostMapping("/creaExperiencia")
    public String crearExperiencia(@RequestBody Experiencia nueva){
        expService.guardarExperiencia(nueva);
        return "Experiencia creada.";
    }
    
    @GetMapping("/buscaExperiencia/{id}")
    public Experiencia buscaExperiencia(@PathVariable Long id){
        return expService.buscarExperiencia(id);
    }
    
    @PutMapping("/editaExperiencia")
    public String editaExperiencia(@PathVariable Long id,
                             @RequestParam("puesto") String nuevoPuesto,
                             @RequestParam("empresa") String nuevaEmpresa,
                             @RequestParam("jornada") String nuevaJornada,
                             @RequestParam("fIngreso") String nuevafIngreso,
                             @RequestParam("fEgreso") String nuevafEgreso,
                             @RequestParam("ubicacion") String nuevaUbicacion,
                             @RequestParam("pais") String nuevoPais){
        Experiencia nueva = expService.buscarExperiencia(id);
        nueva.setPuesto(nuevoPuesto);
        nueva.setEmpresa(nuevaEmpresa);
        nueva.setJornada(nuevaJornada);
        nueva.setFIngreso(nuevafIngreso);
        nueva.setFEgreso(nuevafEgreso);
        nueva.setUbicacion(nuevaUbicacion);
        nueva.setPais(nuevoPais);
        expService.guardarExperiencia(nueva);
        return "Experiencia Editada.";
    }
    
    @DeleteMapping("/borrarExperiencia/{id}")
    public String borrarExperiencia(@PathVariable Long id){
        expService.borrarExperiencia(id);
        return "Experiencia Borrada.";
    }
    
}
