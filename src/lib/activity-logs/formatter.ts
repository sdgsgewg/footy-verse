export const formatEntity = (entityType: string) => {
  const separatedEntityType = entityType.split("_");

  let entity = "";

  for (let i = 0; i < separatedEntityType.length; i++) {
    if (i > 0 && i <= separatedEntityType.length - 1) {
      entity += " ";
    }

    const modifiedText =
      separatedEntityType[i][0].toLocaleUpperCase() + separatedEntityType[i].slice(1).toLocaleLowerCase();

    entity += modifiedText;
  }

  return entity;
};
