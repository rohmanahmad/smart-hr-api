```sql
ALTER TABLE `smart-hr`.`userAccounts` 
CHANGE COLUMN `trashStatus` `trashStatus` INT(1) NOT NULL DEFAULT '0' ,
CHANGE COLUMN `codeVerification` `codeVerification` CHAR(6) NULL COMMENT 'digunakan untuk verifikasi dan forgot password' ;

ALTER TABLE `smart-hr`.`attendance` 
RENAME TO  `smart-hr`.`employeeAttendance` ;

```