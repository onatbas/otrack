
version=1.4
number=$(git tr -1 | xargs -L2 | cut -d\  -f2)

echo "
export const GLOBALCONSTANTS = {
	version: \"$version.$number\"
}
" > globalconstants.ts
