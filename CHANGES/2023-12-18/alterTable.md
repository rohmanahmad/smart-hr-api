```sql
ALTER TABLE `companies` ADD `clientId` INT NOT NULL AFTER `_id`;

ALTER TABLE `userAccounts` ADD `companyId` INT NOT NULL AFTER `_id`;

ALTER TABLE `clients` CHANGE `subscriptionId` `subscriptionId` INT(11) NULL;

ALTER TABLE `clients` CHANGE `updatedAt` `updatedAt` DATETIME NULL;

```
