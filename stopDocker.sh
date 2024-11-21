
function heading() {
    echo ""
    echo "===================="
    for line in "$@"; do
        echo "$line"
    done
    echo "===================="
    echo ""
}


heading "Stopping Docker Container"

docker-compose down

heading "Docker Container Stopped"
