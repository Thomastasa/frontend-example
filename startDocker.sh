
function heading() {
    echo ""
    echo "===================="
    for line in "$@"; do
        echo "$line"
    done
    echo "===================="
    echo ""
}


heading "Starting Docker Container"

docker-compose up -d

heading "Docker Container Running"
