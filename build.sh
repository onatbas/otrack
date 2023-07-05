export COMMIT_NUMBER=$(git tr -1 | xargs -L2 | cut -d\  -f2)
ng build --base-href https://onatbas.github.io/otrack/
