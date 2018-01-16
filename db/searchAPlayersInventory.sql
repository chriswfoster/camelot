SELECT dc.Name, tp.Name, nv.Count  from inventory nv
JOIN itemtemplate tp ON nv.ITemplate_Id = tp.Id_nb
JOIN dolcharacters dc ON dc.DOLCharacters_id = nv.OwnerID
WHERE dc.Name = $1