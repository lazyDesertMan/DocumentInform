/*
 * \brief Данные о иерархии групп
 */
class GroupHierarchyData {
    public group:        number;  //!< ID группы
    public mother_group: number;  //!< ID родительской группы
}

export {
    GroupHierarchyData
}