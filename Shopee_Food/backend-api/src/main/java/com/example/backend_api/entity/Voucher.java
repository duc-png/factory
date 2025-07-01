package com.example.backend_api.entity;

import com.example.backend_api.model.enums.VoucherType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "vouchers", uniqueConstraints = {
        @UniqueConstraint(columnNames = "code")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Voucher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer voucherID;

    @NotBlank
    @Size(max = 50)
    @Column(nullable = false, unique = true, length = 50)
    private String code;

    @NotNull
    @Column(nullable = false)
    private java.math.BigDecimal discount;

    @NotNull
    @Column(nullable = false)
    private java.sql.Date expiryDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private VoucherType voucherType;

    @ManyToOne
    @JoinColumn(name = "shopID")
    private Shop shop;

    @OneToMany(mappedBy = "voucher")
    private List<UserVoucher> userVouchers;

}