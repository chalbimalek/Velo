package com.jihedMathlouthi.veloBack.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class ProductComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne( cascade = CascadeType.REMOVE)
    private User user;
    @ManyToOne( cascade = CascadeType.REMOVE)
    private Product product;
    private String comment;
}
