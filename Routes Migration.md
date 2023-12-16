| No  | V2    | V3    | Include Query Parameters  | Note  |
|:---:|:------|:------|:-------------------------:|:------|
|1  |v2/auth/get-restriction  | v3/package-restriction  | Yes |-  |
|2  |v3/locations/list?type=kabkota |v3/locations/kab-kota | No |-  |
|3  |v3/locations/list?type=province |v3/locations/province | No |-  |
|4  |v2/projects |v3/settings/project | Yes |-  |
|5  |v2/stream/totalgenderofstream?group_by=channel |v3/authors/gender-estimate/by-channels | Yes |exclude "group_by" params  |
|6  |v2/stream/totalgenderofstream?group_by= |v3/authors/gender-estimate/by-total | Yes |exclude "group_by" params  |
|7  |v2/mentions/top_influencer |v3/authors/most-influence | - | - |
|8  |v2/mentions/top_users |v3/authors/most-active/social | - | - |
|9  |v2/mentions/top_users |v3/authors/most-active/news | - | - |
|10  |v2/mentions/ |v2/streams/ | Yes | - |