/*
  Warnings:

  - You are about to alter the column `BS_Time` on the `td_asp` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `BE_Time` on the `td_asp` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `PS_Time` on the `td_asp` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `PE_Time` on the `td_asp` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `AS_Time` on the `td_asp` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `AE_Time` on the `td_asp` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `CPD` on the `td_cost` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Cs_Complete_Date` on the `td_cost` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Cs_Register_Date` on the `td_cost` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Cs_Modify_Date` on the `td_cost` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Request_Delivery` on the `td_order` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Product_Delivery` on the `td_order` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Confirm_Delivery` on the `td_order` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `NAV_Delivery` on the `td_order` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ASP_Delivery` on the `td_order` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Order_Date` on the `td_order` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Pd_Received_Date` on the `td_order` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Pd_Complete_Date` on the `td_order` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `I_Completed_Date` on the `td_order` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Shipment_Date` on the `td_order` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Pd_Calc_Date` on the `td_order` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Calc_Process_Date` on the `td_order` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Rs_Confirm_Date` on the `td_order` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Od_Reg_Date` on the `td_order` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Od_Upd_Date` on the `td_order` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Od_NAV_Upd_Date` on the `td_order` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Pt_Delivery` on the `td_plan` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Target_Delivery` on the `td_plan` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Pl_Reg_Date` on the `td_plan` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Pt_Complete_Date` on the `td_plan` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Pt_I_Date` on the `td_plan` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Pt_Shipment_Date` on the `td_plan` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Pt_Calc_Date` on the `td_plan` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Pt_Confirm_Date` on the `td_plan` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Pl_Upd_Date` on the `td_plan` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Pc_Date` on the `td_procure` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Pc_Req_Delivery` on the `td_procure` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Pc_Ans_Delivery` on the `td_procure` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Pc_Send_Date` on the `td_procure` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Pc_Arrival_Date` on the `td_procure` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Pc_Cancel_Date` on the `td_procure` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Pc_Reg_Date` on the `td_procure` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Pc_Upd_Date` on the `td_procure` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Pc_NAV_Reg_Date` on the `td_procure` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Pc_NAV_Upd_Date` on the `td_procure` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Rs_Reg_Date` on the `td_result` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Rs_Upd_Date` on the `td_result` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `RPD1` on the `td_result` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `RPD2` on the `td_result` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `RPD3` on the `td_result` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `RPD4` on the `td_result` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `RPD5` on the `td_result` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `RPD6` on the `td_result` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `RPD7` on the `td_result` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `RPD8` on the `td_result` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `RPD9` on the `td_result` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `RPD10` on the `td_result` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `RPD11` on the `td_result` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `RPD12` on the `td_result` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `RPD13` on the `td_result` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `RPD14` on the `td_result` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `RPD15` on the `td_result` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `RPD16` on the `td_result` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `RPD17` on the `td_result` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `RPD18` on the `td_result` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `RPD19` on the `td_result` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `RPD20` on the `td_result` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `RPD21` on the `td_result` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `RPD22` on the `td_result` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `RPD23` on the `td_result` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `RPD24` on the `td_result` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `RPD25` on the `td_result` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `RPD26` on the `td_result` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `RPD27` on the `td_result` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `RPD28` on the `td_result` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `RPD29` on the `td_result` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `RPD30` on the `td_result` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `RPD31` on the `td_result` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `RPD32` on the `td_result` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `RPD33` on the `td_result` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `RPD34` on the `td_result` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `RPD35` on the `td_result` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `RPD36` on the `td_result` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Sc_Reg_Date` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Sc_Upd_Date` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `PPD1` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `PPD2` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `PPD3` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `PPD4` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `PPD5` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `PPD6` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `PPD7` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `PPD8` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `PPD9` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `PPD10` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `PPD11` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `PPD12` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `PPD13` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `PPD14` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `PPD15` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `PPD16` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `PPD17` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `PPD18` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `PPD19` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `PPD20` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `PPD21` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `PPD22` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `PPD23` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `PPD24` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `PPD25` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `PPD26` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `PPD27` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `PPD28` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `PPD29` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `PPD30` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `PPD31` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `PPD32` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `PPD33` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `PPD34` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `PPD35` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `PPD36` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ASP1` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ASP2` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ASP3` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ASP4` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ASP5` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ASP6` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ASP7` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ASP8` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ASP9` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ASP10` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ASP11` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ASP12` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ASP13` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ASP14` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ASP15` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ASP16` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ASP17` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ASP18` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ASP19` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ASP20` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ASP21` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ASP22` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ASP23` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ASP24` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ASP25` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ASP26` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ASP27` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ASP28` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ASP29` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ASP30` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ASP31` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ASP32` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ASP33` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ASP34` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ASP35` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ASP36` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `BKD1` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `BKD2` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `BKD3` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `BKD4` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `BKD5` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `BKD6` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `BKD7` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `BKD8` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `BKD9` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `BKD10` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `BKD11` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `BKD12` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `BKD13` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `BKD14` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `BKD15` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `BKD16` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `BKD17` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `BKD18` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `BKD19` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `BKD20` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `BKD21` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `BKD22` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `BKD23` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `BKD24` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `BKD25` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `BKD26` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `BKD27` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `BKD28` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `BKD29` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `BKD30` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `BKD31` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `BKD32` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `BKD33` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `BKD34` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `BKD35` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `BKD36` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `As_Date` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `As_Delivery` on the `td_schedule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Request_Delivery` on the `td_sorder` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Confirm_Delivery` on the `td_sorder` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `SOrder_Date` on the `td_sorder` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Pd_Order_Date` on the `td_sorder` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Pd_Complete_Date` on the `td_sorder` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `I_Completed_Date` on the `td_sorder` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Shipment_Date` on the `td_sorder` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Pd_Calc_Date` on the `td_sorder` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `SO_Sales_Date` on the `td_sorder` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `SO_Confirm_Date` on the `td_sorder` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `SO_Reg_Date` on the `td_sorder` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `SO_Upd_Date` on the `td_sorder` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `PPD` on the `td_wip` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `RPD` on the `td_wip` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ASP` on the `td_wip` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - The primary key for the `tm_holiday` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `Holiday` on the `tm_holiday` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Cost_Save_Time` on the `ts_set` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Cost_Write_Time` on the `ts_set` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `St_Target_Week1` on the `ts_set` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Ed_Target_Week1` on the `ts_set` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `St_Target_Week2` on the `ts_set` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Ed_Target_Week2` on the `ts_set` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `St_Target_Week3` on the `ts_set` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Ed_Target_Week3` on the `ts_set` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `St_Target_Week4` on the `ts_set` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Ed_Target_Week4` on the `ts_set` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `St_Target_Week5` on the `ts_set` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Ed_Target_Week5` on the `ts_set` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Settles_Day` on the `ts_set` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Cost_Save_Time` on the `ts_set1` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Cost_Write_Time` on the `ts_set1` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `St_Target_Week1` on the `ts_set1` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Ed_Target_Week1` on the `ts_set1` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `St_Target_Week2` on the `ts_set1` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Ed_Target_Week2` on the `ts_set1` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `St_Target_Week3` on the `ts_set1` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Ed_Target_Week3` on the `ts_set1` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `St_Target_Week4` on the `ts_set1` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Ed_Target_Week4` on the `ts_set1` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `St_Target_Week5` on the `ts_set1` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Ed_Target_Week5` on the `ts_set1` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Settles_Day` on the `ts_set1` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Cost_Save_Time` on the `ts_set3` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Cost_Write_Time` on the `ts_set3` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `St_Target_Week1` on the `ts_set3` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Ed_Target_Week1` on the `ts_set3` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `St_Target_Week2` on the `ts_set3` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Ed_Target_Week2` on the `ts_set3` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `St_Target_Week3` on the `ts_set3` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Ed_Target_Week3` on the `ts_set3` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `St_Target_Week4` on the `ts_set3` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Ed_Target_Week4` on the `ts_set3` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `St_Target_Week5` on the `ts_set3` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Ed_Target_Week5` on the `ts_set3` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Settles_Day` on the `ts_set3` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Cost_Write_Time` on the `ts_status` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Order_Date` on the `tt_nav_od_csv` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Request_Delivery` on the `tt_nav_od_csv` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Od_Upd_Date` on the `tt_nav_od_csv` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Order_Date` on the `tt_nav_od_csv_upd` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Request_Delivery` on the `tt_nav_od_csv_upd` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Od_Upd_Date` on the `tt_nav_od_csv_upd` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Order_Date` on the `tt_nav_od_fg` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Request_Delivery` on the `tt_nav_od_fg` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `I_Completed_Date` on the `tt_nav_od_fg` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Order_Date` on the `tt_nav_od_wi` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Request_Delivery` on the `tt_nav_od_wi` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Pc_Date` on the `tt_nav_pc_csv` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Pc_Req_Delivery` on the `tt_nav_pc_csv` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Pc_Ans_Delivery` on the `tt_nav_pc_csv` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Pc_Arrival_Date` on the `tt_nav_pc_csv` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Pc_NAV_Reg_Date` on the `tt_nav_pc_csv` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Pc_NAV_Upd_Date` on the `tt_nav_pc_csv` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - The primary key for the `tt_nav_pc_csv_upd` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `tt_nav_pc_csv_upd` table. All the data in the column will be lost.
  - You are about to alter the column `Pc_Date` on the `tt_nav_pc_csv_upd` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Pc_Req_Delivery` on the `tt_nav_pc_csv_upd` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Pc_Ans_Delivery` on the `tt_nav_pc_csv_upd` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Pc_Arrival_Date` on the `tt_nav_pc_csv_upd` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Pc_NAV_Reg_Date` on the `tt_nav_pc_csv_upd` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `Pc_NAV_Upd_Date` on the `tt_nav_pc_csv_upd` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `PPD` on the `tt_plan_result` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `RPD` on the `tt_plan_result` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ASP` on the `tt_plan_result` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Made the column `OdPcLn_No` on table `tt_nav_pc_csv_upd` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `td_asp` MODIFY `BS_Time` DATETIME NULL,
    MODIFY `BE_Time` DATETIME NULL,
    MODIFY `PS_Time` DATETIME NULL,
    MODIFY `PE_Time` DATETIME NULL,
    MODIFY `AS_Time` DATETIME NULL,
    MODIFY `AE_Time` DATETIME NULL;

-- AlterTable
ALTER TABLE `td_cost` MODIFY `CPD` DATETIME NULL,
    MODIFY `Cs_Complete_Date` DATETIME NULL,
    MODIFY `Cs_Register_Date` DATETIME NULL,
    MODIFY `Cs_Modify_Date` DATETIME NULL;

-- AlterTable
ALTER TABLE `td_order` MODIFY `Request_Delivery` DATETIME NULL,
    MODIFY `Product_Delivery` DATETIME NULL,
    MODIFY `Confirm_Delivery` DATETIME NULL,
    MODIFY `NAV_Delivery` DATETIME NULL,
    MODIFY `ASP_Delivery` DATETIME NULL,
    MODIFY `Order_Date` DATETIME NULL,
    MODIFY `Pd_Received_Date` DATETIME NULL,
    MODIFY `Pd_Complete_Date` DATETIME NULL,
    MODIFY `I_Completed_Date` DATETIME NULL,
    MODIFY `Shipment_Date` DATETIME NULL,
    MODIFY `Pd_Calc_Date` DATETIME NULL,
    MODIFY `Calc_Process_Date` DATETIME NULL,
    MODIFY `Rs_Confirm_Date` DATETIME NULL,
    MODIFY `Od_Reg_Date` DATETIME NULL,
    MODIFY `Od_Upd_Date` DATETIME NULL,
    MODIFY `Od_NAV_Upd_Date` DATETIME NULL;

-- AlterTable
ALTER TABLE `td_plan` MODIFY `Pt_Delivery` DATETIME NULL,
    MODIFY `Target_Delivery` DATETIME NULL,
    MODIFY `Pl_Reg_Date` DATETIME NULL,
    MODIFY `Pt_Complete_Date` DATETIME NULL,
    MODIFY `Pt_I_Date` DATETIME NULL,
    MODIFY `Pt_Shipment_Date` DATETIME NULL,
    MODIFY `Pt_Calc_Date` DATETIME NULL,
    MODIFY `Pt_Confirm_Date` DATETIME NULL,
    MODIFY `Pl_Upd_Date` DATETIME NULL;

-- AlterTable
ALTER TABLE `td_procure` MODIFY `Pc_Date` DATETIME NULL,
    MODIFY `Pc_Req_Delivery` DATETIME NULL,
    MODIFY `Pc_Ans_Delivery` DATETIME NULL,
    MODIFY `Pc_Send_Date` DATETIME NULL,
    MODIFY `Pc_Arrival_Date` DATETIME NULL,
    MODIFY `Pc_Cancel_Date` DATETIME NULL,
    MODIFY `Pc_Reg_Date` DATETIME NULL,
    MODIFY `Pc_Upd_Date` DATETIME NULL,
    MODIFY `Pc_NAV_Reg_Date` DATETIME NULL,
    MODIFY `Pc_NAV_Upd_Date` DATETIME NULL;

-- AlterTable
ALTER TABLE `td_result` MODIFY `Rs_Reg_Date` DATETIME NULL,
    MODIFY `Rs_Upd_Date` DATETIME NULL,
    MODIFY `RPD1` DATETIME NULL,
    MODIFY `RPD2` DATETIME NULL,
    MODIFY `RPD3` DATETIME NULL,
    MODIFY `RPD4` DATETIME NULL,
    MODIFY `RPD5` DATETIME NULL,
    MODIFY `RPD6` DATETIME NULL,
    MODIFY `RPD7` DATETIME NULL,
    MODIFY `RPD8` DATETIME NULL,
    MODIFY `RPD9` DATETIME NULL,
    MODIFY `RPD10` DATETIME NULL,
    MODIFY `RPD11` DATETIME NULL,
    MODIFY `RPD12` DATETIME NULL,
    MODIFY `RPD13` DATETIME NULL,
    MODIFY `RPD14` DATETIME NULL,
    MODIFY `RPD15` DATETIME NULL,
    MODIFY `RPD16` DATETIME NULL,
    MODIFY `RPD17` DATETIME NULL,
    MODIFY `RPD18` DATETIME NULL,
    MODIFY `RPD19` DATETIME NULL,
    MODIFY `RPD20` DATETIME NULL,
    MODIFY `RPD21` DATETIME NULL,
    MODIFY `RPD22` DATETIME NULL,
    MODIFY `RPD23` DATETIME NULL,
    MODIFY `RPD24` DATETIME NULL,
    MODIFY `RPD25` DATETIME NULL,
    MODIFY `RPD26` DATETIME NULL,
    MODIFY `RPD27` DATETIME NULL,
    MODIFY `RPD28` DATETIME NULL,
    MODIFY `RPD29` DATETIME NULL,
    MODIFY `RPD30` DATETIME NULL,
    MODIFY `RPD31` DATETIME NULL,
    MODIFY `RPD32` DATETIME NULL,
    MODIFY `RPD33` DATETIME NULL,
    MODIFY `RPD34` DATETIME NULL,
    MODIFY `RPD35` DATETIME NULL,
    MODIFY `RPD36` DATETIME NULL;

-- AlterTable
ALTER TABLE `td_schedule` MODIFY `Sc_Reg_Date` DATETIME NULL,
    MODIFY `Sc_Upd_Date` DATETIME NULL,
    MODIFY `PPD1` DATETIME NULL,
    MODIFY `PPD2` DATETIME NULL,
    MODIFY `PPD3` DATETIME NULL,
    MODIFY `PPD4` DATETIME NULL,
    MODIFY `PPD5` DATETIME NULL,
    MODIFY `PPD6` DATETIME NULL,
    MODIFY `PPD7` DATETIME NULL,
    MODIFY `PPD8` DATETIME NULL,
    MODIFY `PPD9` DATETIME NULL,
    MODIFY `PPD10` DATETIME NULL,
    MODIFY `PPD11` DATETIME NULL,
    MODIFY `PPD12` DATETIME NULL,
    MODIFY `PPD13` DATETIME NULL,
    MODIFY `PPD14` DATETIME NULL,
    MODIFY `PPD15` DATETIME NULL,
    MODIFY `PPD16` DATETIME NULL,
    MODIFY `PPD17` DATETIME NULL,
    MODIFY `PPD18` DATETIME NULL,
    MODIFY `PPD19` DATETIME NULL,
    MODIFY `PPD20` DATETIME NULL,
    MODIFY `PPD21` DATETIME NULL,
    MODIFY `PPD22` DATETIME NULL,
    MODIFY `PPD23` DATETIME NULL,
    MODIFY `PPD24` DATETIME NULL,
    MODIFY `PPD25` DATETIME NULL,
    MODIFY `PPD26` DATETIME NULL,
    MODIFY `PPD27` DATETIME NULL,
    MODIFY `PPD28` DATETIME NULL,
    MODIFY `PPD29` DATETIME NULL,
    MODIFY `PPD30` DATETIME NULL,
    MODIFY `PPD31` DATETIME NULL,
    MODIFY `PPD32` DATETIME NULL,
    MODIFY `PPD33` DATETIME NULL,
    MODIFY `PPD34` DATETIME NULL,
    MODIFY `PPD35` DATETIME NULL,
    MODIFY `PPD36` DATETIME NULL,
    MODIFY `ASP1` DATETIME NULL,
    MODIFY `ASP2` DATETIME NULL,
    MODIFY `ASP3` DATETIME NULL,
    MODIFY `ASP4` DATETIME NULL,
    MODIFY `ASP5` DATETIME NULL,
    MODIFY `ASP6` DATETIME NULL,
    MODIFY `ASP7` DATETIME NULL,
    MODIFY `ASP8` DATETIME NULL,
    MODIFY `ASP9` DATETIME NULL,
    MODIFY `ASP10` DATETIME NULL,
    MODIFY `ASP11` DATETIME NULL,
    MODIFY `ASP12` DATETIME NULL,
    MODIFY `ASP13` DATETIME NULL,
    MODIFY `ASP14` DATETIME NULL,
    MODIFY `ASP15` DATETIME NULL,
    MODIFY `ASP16` DATETIME NULL,
    MODIFY `ASP17` DATETIME NULL,
    MODIFY `ASP18` DATETIME NULL,
    MODIFY `ASP19` DATETIME NULL,
    MODIFY `ASP20` DATETIME NULL,
    MODIFY `ASP21` DATETIME NULL,
    MODIFY `ASP22` DATETIME NULL,
    MODIFY `ASP23` DATETIME NULL,
    MODIFY `ASP24` DATETIME NULL,
    MODIFY `ASP25` DATETIME NULL,
    MODIFY `ASP26` DATETIME NULL,
    MODIFY `ASP27` DATETIME NULL,
    MODIFY `ASP28` DATETIME NULL,
    MODIFY `ASP29` DATETIME NULL,
    MODIFY `ASP30` DATETIME NULL,
    MODIFY `ASP31` DATETIME NULL,
    MODIFY `ASP32` DATETIME NULL,
    MODIFY `ASP33` DATETIME NULL,
    MODIFY `ASP34` DATETIME NULL,
    MODIFY `ASP35` DATETIME NULL,
    MODIFY `ASP36` DATETIME NULL,
    MODIFY `BKD1` DATETIME NULL,
    MODIFY `BKD2` DATETIME NULL,
    MODIFY `BKD3` DATETIME NULL,
    MODIFY `BKD4` DATETIME NULL,
    MODIFY `BKD5` DATETIME NULL,
    MODIFY `BKD6` DATETIME NULL,
    MODIFY `BKD7` DATETIME NULL,
    MODIFY `BKD8` DATETIME NULL,
    MODIFY `BKD9` DATETIME NULL,
    MODIFY `BKD10` DATETIME NULL,
    MODIFY `BKD11` DATETIME NULL,
    MODIFY `BKD12` DATETIME NULL,
    MODIFY `BKD13` DATETIME NULL,
    MODIFY `BKD14` DATETIME NULL,
    MODIFY `BKD15` DATETIME NULL,
    MODIFY `BKD16` DATETIME NULL,
    MODIFY `BKD17` DATETIME NULL,
    MODIFY `BKD18` DATETIME NULL,
    MODIFY `BKD19` DATETIME NULL,
    MODIFY `BKD20` DATETIME NULL,
    MODIFY `BKD21` DATETIME NULL,
    MODIFY `BKD22` DATETIME NULL,
    MODIFY `BKD23` DATETIME NULL,
    MODIFY `BKD24` DATETIME NULL,
    MODIFY `BKD25` DATETIME NULL,
    MODIFY `BKD26` DATETIME NULL,
    MODIFY `BKD27` DATETIME NULL,
    MODIFY `BKD28` DATETIME NULL,
    MODIFY `BKD29` DATETIME NULL,
    MODIFY `BKD30` DATETIME NULL,
    MODIFY `BKD31` DATETIME NULL,
    MODIFY `BKD32` DATETIME NULL,
    MODIFY `BKD33` DATETIME NULL,
    MODIFY `BKD34` DATETIME NULL,
    MODIFY `BKD35` DATETIME NULL,
    MODIFY `BKD36` DATETIME NULL,
    MODIFY `As_Date` DATETIME NULL,
    MODIFY `As_Delivery` DATETIME NULL;

-- AlterTable
ALTER TABLE `td_sorder` MODIFY `Request_Delivery` DATETIME NULL,
    MODIFY `Confirm_Delivery` DATETIME NULL,
    MODIFY `SOrder_Date` DATETIME NULL,
    MODIFY `Pd_Order_Date` DATETIME NULL,
    MODIFY `Pd_Complete_Date` DATETIME NULL,
    MODIFY `I_Completed_Date` DATETIME NULL,
    MODIFY `Shipment_Date` DATETIME NULL,
    MODIFY `Pd_Calc_Date` DATETIME NULL,
    MODIFY `SO_Sales_Date` DATETIME NULL,
    MODIFY `SO_Confirm_Date` DATETIME NULL,
    MODIFY `SO_Reg_Date` DATETIME NULL,
    MODIFY `SO_Upd_Date` DATETIME NULL;

-- AlterTable
ALTER TABLE `td_wip` MODIFY `PPD` DATETIME NULL,
    MODIFY `RPD` DATETIME NULL,
    MODIFY `ASP` DATETIME NULL;

-- AlterTable
ALTER TABLE `tm_holiday` DROP PRIMARY KEY,
    MODIFY `Holiday` DATETIME NOT NULL,
    ADD PRIMARY KEY (`Holiday`);

-- AlterTable
ALTER TABLE `ts_set` MODIFY `Cost_Save_Time` DATETIME NULL,
    MODIFY `Cost_Write_Time` DATETIME NULL,
    MODIFY `St_Target_Week1` DATETIME NULL,
    MODIFY `Ed_Target_Week1` DATETIME NULL,
    MODIFY `St_Target_Week2` DATETIME NULL,
    MODIFY `Ed_Target_Week2` DATETIME NULL,
    MODIFY `St_Target_Week3` DATETIME NULL,
    MODIFY `Ed_Target_Week3` DATETIME NULL,
    MODIFY `St_Target_Week4` DATETIME NULL,
    MODIFY `Ed_Target_Week4` DATETIME NULL,
    MODIFY `St_Target_Week5` DATETIME NULL,
    MODIFY `Ed_Target_Week5` DATETIME NULL,
    MODIFY `Settles_Day` DATETIME NULL;

-- AlterTable
ALTER TABLE `ts_set1` MODIFY `Cost_Save_Time` DATETIME NULL,
    MODIFY `Cost_Write_Time` DATETIME NULL,
    MODIFY `St_Target_Week1` DATETIME NULL,
    MODIFY `Ed_Target_Week1` DATETIME NULL,
    MODIFY `St_Target_Week2` DATETIME NULL,
    MODIFY `Ed_Target_Week2` DATETIME NULL,
    MODIFY `St_Target_Week3` DATETIME NULL,
    MODIFY `Ed_Target_Week3` DATETIME NULL,
    MODIFY `St_Target_Week4` DATETIME NULL,
    MODIFY `Ed_Target_Week4` DATETIME NULL,
    MODIFY `St_Target_Week5` DATETIME NULL,
    MODIFY `Ed_Target_Week5` DATETIME NULL,
    MODIFY `Settles_Day` DATETIME NULL;

-- AlterTable
ALTER TABLE `ts_set2` MODIFY `Use` BIT(1) NULL DEFAULT false,
    MODIFY `Cost_Save` BIT(1) NULL DEFAULT false,
    MODIFY `Cost_Write` BIT(1) NULL DEFAULT false,
    MODIFY `WIP_CSV_Writing` BIT(1) NULL DEFAULT false,
    MODIFY `Label_CSV_FG` BIT(1) NULL DEFAULT false,
    MODIFY `Od_DrawNo_Reflect` BIT(1) NULL DEFAULT false;

-- AlterTable
ALTER TABLE `ts_set3` MODIFY `Cost_Save_Time` DATETIME NULL,
    MODIFY `Cost_Write_Time` DATETIME NULL,
    MODIFY `St_Target_Week1` DATETIME NULL,
    MODIFY `Ed_Target_Week1` DATETIME NULL,
    MODIFY `St_Target_Week2` DATETIME NULL,
    MODIFY `Ed_Target_Week2` DATETIME NULL,
    MODIFY `St_Target_Week3` DATETIME NULL,
    MODIFY `Ed_Target_Week3` DATETIME NULL,
    MODIFY `St_Target_Week4` DATETIME NULL,
    MODIFY `Ed_Target_Week4` DATETIME NULL,
    MODIFY `St_Target_Week5` DATETIME NULL,
    MODIFY `Ed_Target_Week5` DATETIME NULL,
    MODIFY `Settles_Day` DATETIME NULL;

-- AlterTable
ALTER TABLE `ts_status` MODIFY `Cost_Write_Time` DATETIME NULL;

-- AlterTable
ALTER TABLE `tt_nav_od_csv` MODIFY `Order_Date` DATETIME NULL,
    MODIFY `Request_Delivery` DATETIME NULL,
    MODIFY `Od_Upd_Date` DATETIME NULL;

-- AlterTable
ALTER TABLE `tt_nav_od_csv_upd` MODIFY `Order_Date` DATETIME NULL,
    MODIFY `Request_Delivery` DATETIME NULL,
    MODIFY `Od_Upd_Date` DATETIME NULL;

-- AlterTable
ALTER TABLE `tt_nav_od_fg` MODIFY `Order_Date` DATETIME NULL,
    MODIFY `Request_Delivery` DATETIME NULL,
    MODIFY `I_Completed_Date` DATETIME NULL;

-- AlterTable
ALTER TABLE `tt_nav_od_wi` MODIFY `Order_Date` DATETIME NULL,
    MODIFY `Request_Delivery` DATETIME NULL;

-- AlterTable
ALTER TABLE `tt_nav_pc_csv` MODIFY `Pc_Date` DATETIME NULL,
    MODIFY `Pc_Req_Delivery` DATETIME NULL,
    MODIFY `Pc_Ans_Delivery` DATETIME NULL,
    MODIFY `Pc_Arrival_Date` DATETIME NULL,
    MODIFY `Pc_NAV_Reg_Date` DATETIME NULL,
    MODIFY `Pc_NAV_Upd_Date` DATETIME NULL;

-- AlterTable
ALTER TABLE `tt_nav_pc_csv_upd` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    MODIFY `Pc_Date` DATETIME NULL,
    MODIFY `Pc_Req_Delivery` DATETIME NULL,
    MODIFY `Pc_Ans_Delivery` DATETIME NULL,
    MODIFY `Pc_Arrival_Date` DATETIME NULL,
    MODIFY `Pc_NAV_Reg_Date` DATETIME NULL,
    MODIFY `Pc_NAV_Upd_Date` DATETIME NULL,
    MODIFY `OdPcLn_No` VARCHAR(46) NOT NULL,
    ADD PRIMARY KEY (`OdPcLn_No`);

-- AlterTable
ALTER TABLE `tt_plan_result` MODIFY `PPD` DATETIME NULL,
    MODIFY `RPD` DATETIME NULL,
    MODIFY `ASP` DATETIME NULL;

-- AddForeignKey
ALTER TABLE `TD_WIP` ADD CONSTRAINT `TD_WIP_PPG_fkey` FOREIGN KEY (`PPG`) REFERENCES `TM_ProcessG`(`ProcessG_CD`) ON DELETE SET NULL ON UPDATE CASCADE;
