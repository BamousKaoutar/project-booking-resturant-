package mapper;

import dto.CategorieDTO;
import model.Categorie;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(uses = ProduitMapper.class)
public interface CategorieMapper {
    CategorieMapper INSTANCE = Mappers.getMapper(CategorieMapper.class);

    CategorieDTO categorieToCategorieDTO(Categorie categorie);

    Categorie categorieDTOToCategorie(CategorieDTO categorieDTO);
}
