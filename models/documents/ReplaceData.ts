/*
 * \brief Данные о замене файла
 */
class ReplaceData {
    public old_version: number;  //!< ID заменяемого документа
    public new_version: number;  //!< ID документа, заменяющего устаревший
}

export {
    ReplaceData
}