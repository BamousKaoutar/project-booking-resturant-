package mapper;

import dto.ProduitDTO;
import model.Produit;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ProduitMapper {
    ProduitMapper INSTANCE = Mappers.getMapper(ProduitMapper.class);

    ProduitDTO produitToProduitDTO(Produit produit);

    Produit produitDTOToProduit(ProduitDTO produitDTO);
}