package com.jihedMathlouthi.veloBack.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "Defi")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Defi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @JsonProperty("DateSorite")
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime DateSortie;
    private String pointArrivee;
    private String pointSorite;

    private String title;

    private Integer nbrPlaceDisponible ;
    private float price;
    private String description;

    //annonceur
    @ManyToOne( cascade = CascadeType.ALL)
    @JsonIgnore
    @JoinColumn(name = "user_id")
    private User user;
    @JsonIgnore
    // Utilisateur qui annonce le covoiturage
    @OneToMany(mappedBy = "defi")
    private Set<Notification> notifications;
    @ManyToMany( cascade = CascadeType.REMOVE)
    @JsonIgnore
    private List<User> chercheurs;
    @ManyToMany(cascade = CascadeType.REMOVE)
    private Set<User> utilisateursAcceptes = new HashSet<>();
    @ManyToMany(fetch = FetchType.EAGER ,cascade =  CascadeType.ALL)
    @JoinTable(name = "defi_image" ,joinColumns = {@JoinColumn(name = "defi_idd")}
            ,inverseJoinColumns = {@JoinColumn (name = "image_idd")})
    private Set<ImageModel> imageModels;
    private Boolean status;

    @OneToMany(mappedBy = "defi")
    private List<User> users;
}
