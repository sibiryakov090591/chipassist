import constants from "@src/constants/constants";
import { ID_PCBONLINE, ID_SUPPLIER_RESPONSE } from "@src/constants/server_constants";
import { ChatPartner } from "@src/store/chat/chatTypes";

export const getPartnerName = (partnerItem: ChatPartner) => {
  if (!partnerItem) return null;
  return [ID_SUPPLIER_RESPONSE, ID_PCBONLINE].includes(constants.id)
    ? Object.entries(partnerItem).reduce((acc: string, entry: any) => {
        const [key, value] = entry;
        if (value) return acc ? `${acc}${key === "company_name" ? ` (${value})` : ` ${value}`}` : value;
        return acc;
      }, "")
    : partnerItem.first_name;
};

export default "chat fn";
