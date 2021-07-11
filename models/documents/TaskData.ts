/*
 * \brief ������ � ������ �� ������������
 */
class TaskData {
    public id:          number;   //!< ID ������
    public sender:      number;   //!< ID ������������, ��������� ������
    public recipient:   number;   //!< ID ������������, ����������� ������
    public document_id: number;   //!< ID ���������, � ������� ��������� ������������
    public must_read:   boolean;  //!< ������ �� ���������� ������������ � ����������
    public must_resend: boolean;  //!< ������ �� ���������� ��������� �������� ����������
    public send_date:   Date;     //!< ���� ������ ������
    public deadline:    Date;     //!< ������� ���� ������������ � ����������
}

export {
    TaskData
}