package backend.controller;

import backend.dto.PersonaDTO;
import backend.service.PersonaService;
import java.util.List;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200/")
@RequestMapping("/persona")
public class PersonaController {
    
    @Autowired
    private PersonaService perService;
    
    @GetMapping("/verPersonas")
    public ResponseEntity<List<PersonaDTO>> verPersonas(){
        List<PersonaDTO> rta = perService.verPersonas();
        return new ResponseEntity<>(rta,HttpStatus.OK);
    }
    
    @GetMapping("/buscarPersona/{id}")
    public ResponseEntity<PersonaDTO> buscaPersona(@PathVariable("id") Long id){
        PersonaDTO rta = perService.buscarPersona(id);
        return new ResponseEntity<>(rta,HttpStatus.OK);
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/crearPersona")
    public ResponseEntity<PersonaDTO> crearPersona(@Valid @RequestBody PersonaDTO nueva){
        PersonaDTO rta = perService.crearPersona(nueva);
        return new ResponseEntity<>(rta,HttpStatus.CREATED);
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/editarPersona/{id}")
    public ResponseEntity<PersonaDTO> editaPersona(
             @RequestBody PersonaDTO persona,
            @PathVariable("id") Long id){
        PersonaDTO rta = perService.editarPersona(persona,id);
        return new ResponseEntity<>(rta,HttpStatus.OK);
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/borrarPersona/{id}")
    public ResponseEntity<?> borrarPersona(@PathVariable("id") Long id){
        perService.borrarPersona(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
}
